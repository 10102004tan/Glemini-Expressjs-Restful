'use strict';
const mammoth = require('mammoth');
const { BadRequestError } = require('../cores/error.repsone');
const questionModel = require('../models/question.model');
const quizModel = require('../models/quiz.model');
const subjectModel = require('../models/subject.model');
const fs = require('fs');

const UploadService = require('./upload.service');
const { model } = require('../configs/gemini.config');
const {
  Types: { ObjectId },
} = require('mongoose');
const notificationModel = require('../models/notification.model');

class QuizService {
  // Hàm tạo quiz
  async createQuiz({ user_id, quiz_name, quiz_description }) {
    const newQuiz = await quizModel.create({
      user_id,
      quiz_name,
      quiz_description,
    });

    if (!newQuiz) {
      throw new BadRequestError('Quiz not created');
    }
    return newQuiz;
  }

  // Hàm lấy danh sách quiz theo user
  async getQuizByUser({
    user_id,
    skip = 0,
    limit = 2,
    quiz_name,
    quiz_status,
    start_filter_date,
    end_filter_date,
    quiz_subjects,
  }) {
    // Kiểm tra nếu không có user_id
    if (!user_id) {
      throw new BadRequestError('User ID is required');
    }

    // Tạo query cơ bản
    let query = {
      user_id,
      quiz_status: { $ne: 'deleted' }, // Lấy quiz có trạng thái khác 'deleted'
    };

    // Áp dụng các bộ lọc nếu có
    if (quiz_name) {
      query.quiz_name = { $regex: quiz_name, $options: 'i' }; // Tìm kiếm theo tên
    }

    if (quiz_status) {
      query.quiz_status = quiz_status; // Tìm theo trạng thái cụ thể
    }

    if (start_filter_date || end_filter_date) {
      query.createdAt = {};
      if (start_filter_date) query.createdAt.$gte = new Date(start_filter_date);
      if (end_filter_date) query.createdAt.$lte = new Date(end_filter_date);
    }

    if (quiz_subjects && quiz_subjects.length > 0) {
      query.subject_ids = { $in: quiz_subjects }; // Lọc theo danh sách môn học
    }

    // Truy vấn dữ liệu với skip & limit cho load more
    const quizzies = await quizModel.find(query).skip(skip).limit(limit).lean();

    if (!quizzies || quizzies.length === 0) {
      return [];
    }

    return quizzies;
  }

  // Hàm lấy thông tin quiz theo id
  async getQuizById({ quiz_id }) {
    const quiz = await quizModel.findById(quiz_id);
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }
    return quiz;
  }

  // Hàm lấy danh sách câu hỏi theo quiz
  async getQuestionsByQuiz({ quiz_id }) {
    const questions = await questionModel
      .find({ quiz_id })
      .populate('question_answer_ids')
      .populate('correct_answer_ids')
      .exec();

    if (!questions) {
      throw new BadRequestError('Questions not found');
    }

    return questions;
  }

  // Hàm lấy danh sách quiz theo môn học
  async getQuizzesBySubjectIdPublished() {
    const subjects = await subjectModel.find({});
    const results = [];

    for (const subject of subjects) {
      const quizzes = await quizModel.aggregate([
        {
          $match: {
            quiz_status: 'published',
            subject_ids: { $in: [subject._id] },
          },
        },
        {
          $lookup: {
            from: 'questions', // Tên collection chứa câu hỏi
            localField: '_id', // Trường liên kết từ quiz
            foreignField: 'quiz_id', // Trường liên kết từ câu hỏi
            as: 'questions', // Kết quả lookup sẽ được lưu tại "questions"
          },
        },
        {
          $match: { 'questions.0': { $exists: true } }, // Chỉ lấy quiz có ít nhất 1 câu hỏi
        },
        {
          $addFields: {
            total_questions: { $size: '$questions' }, // Tính tổng số câu hỏi
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 4,
        },
        {
          $lookup: {
            from: 'users', // Tên collection chứa user
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: 1,
            quiz_name: 1,
            quiz_thumb: 1,
            quiz_description: 1,
            quiz_turn: 1,
            quiz_status: 1,
            createdAt: 1,
            total_questions: 1,
            'user.user_fullname': 1,
            'user.user_avatar': 1,
          },
        },
      ]);

      if (quizzes.length > 0) {
        results.push({
          subject: subject,
          quizzes: quizzes,
        });
      }
    }

    return results;
  }

  // Hàm tối ưu lấy 3 bộ quiz có lượt chơi nhiều nhất
  async getQuizzesBanner() {
    const quizzes = await quizModel.aggregate([
      {
        $match: { quiz_status: 'published' },
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'quiz_id',
          as: 'questions',
        },
      },
      {
        $match: { 'questions.0': { $exists: true } }, // Chỉ lấy quiz có ít nhất 1 câu hỏi
      },
      {
        $sort: { quiz_turn: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          quiz_name: 1,
          quiz_turn: 1,
          quiz_thumb: 1,
          quiz_description: 1,
          'user.user_fullname': 1,
          'user.user_avatar': 1,
          'user.user_email': 1,
        },
      },
    ]);

    return quizzes;
  }

  // Search {name-desc} and filter {quiz_turn, date}
  async search({ key, skip = 0, limit = 20, sortStatus = 1, quiz_on = -1, subjectIds }) {
    const query = {};
    if (key) {
      query.quiz_name = { $regex: key, $options: 'i' };
    }

    // get quiz published
    query.quiz_status = 'published';

    // get quiz by subject : quiz.subject_ids = [1,2,3,4] ; subjectIds = [1,2]
    if (subjectIds && subjectIds.length > 0) {
      subjectIds = subjectIds.map((subjectId) => ObjectId.createFromHexString(subjectId));
      query.subject_ids = { $in: subjectIds };
    }

    if (quiz_on !== -1) {
      query.quiz_turn = { $gte: quiz_on };
    }

    return await quizModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'quiz_id',
          as: 'questions',
        },
      },
      {
        // lookup with user and unwind
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          quiz_name: 1,
          quiz_description: 1,
          quiz_thumb: 1,
          user_id: 1,
          quiz_turn: 1,
          quiz_status: 1,
          createdAt: 1,
          subject_ids: 1,
          user_avatar: '$user.user_avatar',
          user_fullname: '$user.user_fullname',
          question_count: { $size: '$questions' }, // Count of questions
        },
      },
      {
        $match: { question_count: { $gt: 0 } },
      },
      { $sort: { createdAt: sortStatus } },
      { $skip: skip },
      { $limit: limit },
    ]);
  }

  async searchV2({ key, skip = 0, limit = 20, sortStatus = 1, quiz_on = -1, subjectIds }) {
    const query = {};
    if (key) {
      query.quiz_name = { $regex: key, $options: 'i' };
    }

    // get quiz published
    query.quiz_status = 'published';

    // get quiz by subject : quiz.subject_ids = [1,2,3,4] ; subjectIds = [1,2]
    if (subjectIds && subjectIds.length > 0) {
      subjectIds = subjectIds.map((subjectId) => ObjectId.createFromHexString(subjectId));
      query.subject_ids = { $in: subjectIds };
    }

    if (quiz_on !== -1) {
      query.quiz_turn = { $gte: quiz_on };
    }
    const result = {
      items: [],
      totalPage: 0,
      totalItems: 0,
    };
    const quizzes = await quizModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'quiz_id',
          as: 'questions',
        },
      },
      {
        // lookup with user and unwind
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          quiz_name: 1,
          quiz_description: 1,
          quiz_thumb: 1,
          user_id: 1,
          quiz_turn: 1,
          quiz_status: 1,
          createdAt: 1,
          subject_ids: 1,
          user_avatar: '$user.user_avatar',
          user_fullname: '$user.user_fullname',
          question_count: { $size: '$questions' }, // Count of questions
        },
      },
      {
        $match: { question_count: { $gt: 0 } },
      },
      { $sort: { createdAt: sortStatus } },
      { $skip: skip },
      { $limit: limit },
    ]);

    result.items = quizzes;
    result.totalItems = await quizModel.countDocuments(query);
    result.totalPage = Math.ceil(result.totalItems / limit);
    return result;
  }

  // create duplicate quiz
  async duplicateQuiz({ quiz_id, user_id }) {
    const quiz = await quizModel.findById(quiz_id).populate('user_id');
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    console.log(quiz.user_id);

    const newQuiz = await quizModel.create({
      user_id: user_id,
      quiz_name: quiz.quiz_name + ' (copy)',
      quiz_description: `${quiz.quiz_name} copy from ${quiz.user_id.user_fullname}`,
      quiz_thumb: quiz.quiz_thumb,
      subject_ids: quiz.subject_ids,
      quiz_status: 'unpublished',
      quiz_turn: quiz.quiz_turn,
    });

    if (!newQuiz) {
      throw new BadRequestError('Quiz not created');
    }

    const questions = await questionModel.find({ quiz_id: quiz_id });

    if (questions.length > 0) {
      // Create new questions
      const newQuestions = questions.map((question) => {
        return {
          quiz_id: newQuiz._id,
          question_excerpt: question.question_excerpt,
          question_description: question.question_description,
          question_audio: question.question_audio,
          question_image: question.question_image,
          question_video: question.question_video,
          question_point: question.question_point,
          question_time: question.question_time,
          question_explanation: question.question_explanation,
          question_type: question.question_type,
          question_answer_ids: question.question_answer_ids,
          correct_answer_ids: question.correct_answer_ids,
        };
      });

      await questionModel.insertMany(newQuestions);
    }

    return newQuiz;
  }

  // Hàm lấy thông tin chi tiết của quiz
  async getQuizDetails({ quiz_id }) {
    // console.log(quiz_id);
    const quiz = await quizModel.findById(quiz_id);
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    return quiz;
  }

  // Hàm xóa quiz
  async deleteQuiz({ quiz_id }) {
    ``;
    const quiz = await quizModel.findByIdAndUpdate(quiz_id, {
      quiz_status: 'deleted',
    });
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }
    return quiz;
  }

  //kiểm tra quiz đó có phải của user chủ hay là của người khác chia sẻ , nếu chủ thì lấy hàm xóa quiz, nếu không thì xóa user_id trong mảng shared_user_ids

  // Hàm cập nhật thông tin quiz
  async updateQuiz({
    quiz_id,
    quiz_name,
    quiz_description,
    quiz_subjects,
    quiz_status,
    quiz_thumb,
  }) {
    const quiz = await quizModel.findByIdAndUpdate(
      quiz_id,
      {
        quiz_name,
        quiz_description,
        quiz_thumb,
      },
      { new: true },
    );

    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Cập nhật thông tin cho trường subject_ids
    if (quiz_subjects && quiz_subjects.length > 0) {
      quiz.subject_ids = quiz_subjects;
      await quiz.save();
    }

    // Cập nhật thông tin cho trường quiz_status
    if (quiz_status) {
      // console.log(quiz_status);
      switch (quiz_status) {
        case 'published':
          quiz.quiz_status = 'published';
          break;
        case 'unpublished':
          quiz.quiz_status = 'unpublished';
          break;
        case 'deleted':
          quiz.quiz_status = 'deleted';
          break;
        default:
          break;
      }
      await quiz.save();
    }

    return quiz;
  }

  // Hàm upload file ảnh
  async uploadQuiz(req) {
    console.log(req.file);
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    const uploadUrl = await UploadService.uploadImageFromOneFile({
      path: req.file.path,
      folderName: '/quizzes/' + req.file.filename,
    });

    return uploadUrl;
  }

  // Hàm upload file docx
  async uploadDoc(req, res) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    // console.log(req.file);

    const filePath = req.file.path;
    const result = await mammoth.extractRawText({ path: filePath });
    const questions = QuizService.parseQuestionsFromText(result.value);
    return questions;
  }

  // Hàm upload file md
  async uploadMd(req, res) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    const filePath = req.file.path; // Lấy đường dẫn của tệp đã tải lên

    // Đọc nội dung của tệp Markdown
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Đọc tệp và chuyển đổi sang chuỗi

    // Phân tích các câu hỏi từ nội dung tệp Markdown
    const questions = QuizService.parseQuestionsFromMd(fileContent);
    return questions; // Trả về các câu hỏi đã phân tích
  }

  // Hàm upload file md
  async uploadTxt(req, res) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    const filePath = req.file.path; // Lấy đường dẫn của tệp đã tải lên

    // Đọc nội dung của tệp Markdown
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Đọc tệp và chuyển đổi sang chuỗi

    // Phân tích các câu hỏi từ nội dung tệp Markdown
    const questions = QuizService.parseQuestionsFromText(fileContent);
    return questions; // Trả về các câu hỏi đã phân tích
  }

  // Hàm phân tích nội dung và tạo câu hỏi từ file docx
  static parseQuestionsFromText = (text) => {
    console.log('📄 Parsing text template...');
    const lines = text.split('\n');
    const questions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      line = line.replace('\r', '').trim();

      // Detect question start
      if (line.startsWith('Question:')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: line.split('Question:')[1].trim(),
          answers: [],
          questionType: 'single', // default
        };
      }
      // Detect question type
      else if (line.startsWith('Type:')) {
        const type = line.split('Type:')[1].trim().toLowerCase();
        if (['single', 'multiple', 'fill', 'order', 'match'].includes(type)) {
          currentQuestion.questionType = type;
        }
      }
      // Handle different answer formats based on type
      else if (line.startsWith('Answer: ') || line.match(/^[A-Z]\./)) {
        const answer = line.startsWith('Answer: ') ? line.split('Answer: ')[1] : line;
        currentQuestion.answers.push(answer);
      }
      // Handle fill-in-blank answers with position
      else if (line.startsWith('Fill: ')) {
        const fillData = line.split('Fill: ')[1];
        const parts = fillData.split(' (position: ');
        if (parts.length === 2) {
          const answer = parts[0];
          const position = parseInt(parts[1].replace(')', ''));
          currentQuestion.answers.push({ answer, position });
        }
      }
      // Handle order answers with position
      else if (line.startsWith('Order: ')) {
        const orderData = line.split('Order: ')[1];
        const parts = orderData.split(' (position: ');
        if (parts.length === 2) {
          const answer = parts[0];
          const position = parseInt(parts[1].replace(')', ''));
          currentQuestion.answers.push({ answer, position });
        }
      }
      // Handle match pairs
      else if (line.startsWith('Match: ')) {
        const matchData = line.split('Match: ')[1];
        const parts = matchData.split(' -> ');
        if (parts.length === 2) {
          currentQuestion.answers.push({ answer: parts[0], matchPair: parts[1] });
        }
      }
      // Handle correct answers
      else if (line.startsWith('Correct Answer:')) {
        currentQuestion.correctAnswer = line.split(': ')[1];
      }
      // Handle multiple correct answers
      else if (line.startsWith('Correct Answers:')) {
        currentQuestion.correctAnswers = line
          .split(': ')[1]
          .split(',')
          .map((a) => a.trim());
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    console.log(`✅ Parsed ${questions.length} questions from text template`);
    return questions;
  };

  // Hàm phân tích nội dung và tạo câu hỏi từ file md
  static parseQuestionsFromMd(text) {
    console.log('📄 Parsing markdown template...');
    const lines = text.split('\n');
    const questions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      line = line.trim();

      // Detect question start
      if (line.startsWith('## Question:')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: line.split('## Question:')[1].trim(),
          answers: [],
          questionType: 'single', // default
        };
      }
      // Detect question type
      else if (line.startsWith('**Type:**')) {
        const type = line.split('**Type:**')[1].trim().toLowerCase();
        if (['single', 'multiple', 'fill', 'order', 'match'].includes(type)) {
          currentQuestion.questionType = type;
        }
      }
      // Handle choice answers
      else if (line.match(/^-\s+[A-Z]\./)) {
        const answer = line.replace(/^-\s+/, '').trim();
        currentQuestion.answers.push(answer);
      }
      // Handle fill-in-blank answers
      else if (line.startsWith('- **Fill:**')) {
        const fillData = line.split('- **Fill:**')[1].trim();
        const parts = fillData.split(' (position: ');
        if (parts.length === 2) {
          const answer = parts[0];
          const position = parseInt(parts[1].replace(')', ''));
          currentQuestion.answers.push({ answer, position });
        }
      }
      // Handle order answers
      else if (line.startsWith('- **Order:**')) {
        const orderData = line.split('- **Order:**')[1].trim();
        const parts = orderData.split(' (position: ');
        if (parts.length === 2) {
          const answer = parts[0];
          const position = parseInt(parts[1].replace(')', ''));
          currentQuestion.answers.push({ answer, position });
        }
      }
      // Handle match pairs
      else if (line.startsWith('- **Match:**')) {
        const matchData = line.split('- **Match:**')[1].trim();
        const parts = matchData.split(' -> ');
        if (parts.length === 2) {
          currentQuestion.answers.push({ answer: parts[0], matchPair: parts[1] });
        }
      }
      // Handle correct answers
      else if (line.startsWith('### Correct Answer:')) {
        currentQuestion.correctAnswer = line.split(': ')[1].trim();
      }
      // Handle multiple correct answers
      else if (line.startsWith('### Correct Answers:')) {
        currentQuestion.correctAnswers = line
          .split(': ')[1]
          .split(',')
          .map((a) => a.trim());
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    console.log(`✅ Parsed ${questions.length} questions from markdown template`);
    return questions;
  }

  // Hàm lấy template file docx
  async getDocsTemplate(req, res) {}

  // Hàm tìm kiếm quiz theo yêu cầu của người dùng
  async filterQuizzes({
    user_id,
    quiz_subjects,
    quiz_status,
    quiz_name,
    start_filter_date,
    end_filter_date,
    skip = 0, // Số bản ghi cần bỏ qua (phân trang)
    limit = 10, // Số lượng bản ghi cần lấy
  }) {
    // Kiểm tra nếu không có id người dùng thì trả về lỗi
    if (!user_id) {
      throw new BadRequestError('User ID is required');
    }

    // Tạo query để tìm kiếm
    let query = { user_id };

    // Kiểm tra nếu có tên quiz thì thêm vào query
    if (quiz_name) {
      query.quiz_name = { $regex: quiz_name, $options: 'i' };
    }

    // Kiểm tra nếu có trạng thái quiz thì thêm vào query
    if (quiz_status) {
      query.quiz_status = quiz_status;
    } else {
      query.quiz_status = { $ne: 'deleted' }; // Chỉ khi không có quiz_status
    }

    // Kiểm tra ngày tạo
    if (start_filter_date || end_filter_date) {
      query.createdAt = {};
      if (start_filter_date) query.createdAt.$gte = new Date(start_filter_date);
      if (end_filter_date) query.createdAt.$lte = new Date(end_filter_date);
    }

    // Kiểm tra nếu có danh sách môn học thì thêm vào query
    if (quiz_subjects && quiz_subjects.length > 0) {
      query.subject_ids = { $in: quiz_subjects };
    }

    // Tìm kiếm quiz theo query và áp dụng phân trang
    const quizzes = await quizModel
      .find(query)
      .skip(skip) // Bỏ qua các bản ghi đầu tiên
      .limit(limit) // Lấy số lượng bản ghi giới hạn
      .lean(); // Tăng hiệu suất khi chỉ lấy dữ liệu gốc

    // Trả về dữ liệu và trạng thái còn dữ liệu
    const totalQuizzes = await quizModel.countDocuments(query); // Đếm tổng số quiz phù hợp
    const hasMore = skip + limit < totalQuizzes; // Xác định còn dữ liệu hay không

    return {
      quizzes, // Danh sách quiz
      hasMore, // Còn dữ liệu để load thêm không
    };
  }

  // Hàm tạo ra bộ câu hỏi từ gemini AI theo prompt
  async geminiCreateQuestionByPrompt({ prompt }) {
    console.log('🤖 Backend - Starting Gemini AI generation with prompt:', prompt);

    // Kiểm tra nếu không có prompt thì trả về lỗi
    if (!prompt) {
      throw new BadRequestError('Prompt is required');
    }

    try {
      // Tạo prompt hướng dẫn chi tiết cho AI
      const enhancedPrompt = `
      Bạn là một chuyên gia tạo câu hỏi quiz giáo dục. Hãy tạo các câu hỏi đa dạng và chất lượng cao dựa trên yêu cầu sau:

      "${prompt}"

      Yêu cầu cụ thể:
      1. Tạo ít nhất 5-10 câu hỏi đa dạng về chủ đề này
      2. Sử dụng 4 loại câu hỏi khác nhau:
        - "single": Chọn 1 đáp án đúng (4 lựa chọn)
        - "multiple": Chọn nhiều đáp án đúng (4 lựa chọn, có thể có 2-3 đáp án đúng)
        - "fill": Điền từ vào chỗ trống (sử dụng dấu _ để đánh dấu chỗ trống)
        - "order": Sắp xếp theo thứ tự (5-8 mục cần sắp xếp)

      Hướng dẫn chi tiết theo từng loại:

      **Single/Multiple Choice:**
      - Tạo 4 đáp án, trong đó single có 1 đáp án đúng, multiple có 2-3 đáp án đúng
      - Các đáp án sai phải hợp lý và có tính chất nhiễu

      **Fill-in-blank:**
      - Câu hỏi có dạng: "Thủ đô của Việt Nam là ___ và nó nằm ở miền ___"
      - Tạo danh sách các từ cần điền với position tương ứng
      - Mỗi answer có answerName (từ cần điền) và position (vị trí thứ mấy)

      **Order Questions:**
      - Tạo danh sách 5-8 mục cần sắp xếp theo thứ tự logic
      - Mỗi answer có answerName và position (thứ tự đúng)
      - Ví dụ: sắp xếp các hành tinh theo khoảng cách từ mặt trời

      **Match Questions:**
      - Tạo 4-6 cặp cần nối với nhau
      - Mỗi answer có answerName và matchPair
      - Ví dụ: nối quốc gia với thủ đô

      Đảm bảo:
      - Câu hỏi phù hợp với độ tuổi và trình độ
      - Nội dung chính xác và cập nhật
      - Giải thích rõ ràng cho mỗi câu hỏi
      - Ngôn ngữ tiếng Việt chuẩn và dễ hiểu
      `;

      console.log('📡 Backend - Calling Gemini API...');
      const startTime = Date.now();

      // Tạo câu hỏi từ prompt đã được cải thiện
      const result = await model.generateContent(enhancedPrompt);

      const endTime = Date.now();
      console.log(`⏱️ Backend - Gemini API responded in ${endTime - startTime}ms`);

      const responseText = result.response.text();
      console.log('📄 Backend - Raw Gemini response length:', responseText.length);

      // Trả về câu hỏi vừa tạo
      const parsedResult = JSON.parse(responseText);
      console.log('✅ Backend - Successfully parsed', parsedResult.length, 'questions');

      return parsedResult;
    } catch (error) {
      console.error('❌ Backend - Gemini AI Error:', error);
      console.error('❌ Backend - Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      // Re-throw với thông tin chi tiết hơn
      if (error.message.includes('API key')) {
        throw new BadRequestError('Gemini API key không hợp lệ');
      } else if (error.message.includes('quota')) {
        throw new BadRequestError('Gemini API đã vượt quá giới hạn');
      } else if (error.message.includes('timeout')) {
        throw new BadRequestError('Gemini API timeout - vui lòng thử lại');
      } else {
        throw new BadRequestError(`Lỗi Gemini AI: ${error.message}`);
      }
    }
  }

  // Hàm tạo câu hỏi từ gemini AI theo prompt dữ liệu trả về dạng stream
  geminiCreateQuestionByPromptStream = async (req, res) => {
    const { prompt } = req.body;

    // Kiểm tra nếu không có prompt
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    try {
      // Giả lập quá trình tạo câu hỏi từ Gemini AI theo từng phần
      const questions = await model.generateContent(prompt);

      for (const question of questions) {
        // Gửi từng chunk dữ liệu đến client
        res.write(`data: ${JSON.stringify(question)}\n\n`);
        // Giả lập độ trễ giữa các lần gửi
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (err) {
      throw err;
    }
  };

  // Hàm tạo câu hỏi từ gemini AI theo hình ảnh
  async geminiCreateQuestionByImages(req) {
    // Kiểm tra nếu không có file ảnh thì trả về lỗi
    const file = req.file;
    console.log(file);
    if (!file) {
      throw new BadRequestError('No file uploaded');
    }

    const fileName = req.file.filename;
    const prompt = req.body.prompt || 'Tạo câu hỏi dựa trên hình ảnh này';

    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync('src/v1/uploads/geminies/' + fileName)).toString(
          'base64',
        ),
        mimeType: file.mimetype,
      },
    };

    // Tạo prompt hướng dẫn chi tiết cho AI khi phân tích hình ảnh
    const enhancedImagePrompt = `
Bạn là một chuyên gia tạo câu hỏi quiz giáo dục. Hãy phân tích hình ảnh này và tạo các câu hỏi đa dạng, chất lượng cao.

Yêu cầu người dùng: "${prompt}"

Hướng dẫn tạo câu hỏi:
1. Phân tích kỹ nội dung hình ảnh (đối tượng, màu sắc, bối cảnh, văn bản nếu có)
2. Tạo 5-8 câu hỏi đa dạng dựa trên hình ảnh
3. Sử dụng các loại câu hỏi khác nhau:
   - "single": Chọn 1 đáp án đúng về nội dung hình ảnh
   - "multiple": Chọn nhiều đáp án đúng về các yếu tố trong hình
   - "fill": Điền từ mô tả hình ảnh (sử dụng dấu _)
   - "order": Sắp xếp các bước/quá trình thể hiện trong hình

Ví dụ câu hỏi dựa trên hình ảnh:
- Nhận dạng đối tượng: "Trong hình có bao nhiêu...?"
- Màu sắc: "Màu chủ đạo của... trong hình là gì?"
- Vị trí: "Đối tượng X nằm ở đâu trong hình?"
- Ngữ cảnh: "Hình ảnh này thể hiện hoạt động gì?"
- Chi tiết: "Điền từ mô tả: Trong hình có ___ đang ___"

Đảm bảo:
- Câu hỏi dựa trên nội dung thực tế của hình ảnh
- Đáp án chính xác và có căn cứ từ hình ảnh
- Ngôn ngữ tiếng Việt rõ ràng, dễ hiểu
- Độ khó phù hợp với đối tượng học tập
`;

    const result = await model.generateContent([enhancedImagePrompt, image]);
    const response = JSON.parse(result.response.text());
    return response;
  }
  // lấy tất cả quiz mà shared_user_ids có chứa user_id
  async getAllQuizShared({ user_id, skip = 0, limit = 2 }) {
    console.log('skip', skip);
    const quizzies = await quizModel
      .find({
        shared_user_ids: { $elemMatch: { user_id: user_id } },
        quiz_status: { $ne: 'deleted' },
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!quizzies) {
      // Kiểm tra mảng không rỗng
      throw new BadRequestError('No shared quizzes found');
    }

    return quizzies;
  }

  // Hàm xóa quiz đã chia sẻ dựa trên user_id
  async removeQuizShared({ user_id, quiz_id }) {
    const quiz = await quizModel.updateOne(
      { _id: quiz_id },
      { $pull: { shared_user_ids: { user_id } } }, // Đảm bảo chỉ truyền `user_id` mà không có đối tượng { user_id }
    );

    if (quiz.modifiedCount === 0) {
      throw new BadRequestError('Quiz not found or user not shared');
    }

    return quiz;
  }

  // sao chép lại tất cả thông tin cùa quiz đã chia sẻ
  async copyQuizShared({ user_id, quiz_id }) {
    const quiz = await quizModel.findOne({ _id: quiz_id });

    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    const newQuiz = await quizModel.create({
      user_id,
      quiz_name: quiz.quiz_name + ' (copy)',
      quiz_description: quiz.quiz_description,
      quiz_thumb: quiz.quiz_thumb,
      subject_ids: quiz.subject_ids,
      quiz_status: 'unpublished',
      quiz_turn: quiz.quiz_turn,
    });

    if (!newQuiz) {
      throw new BadRequestError('Quiz not created');
    }

    const questions = await questionModel.find({ quiz_id: quiz_id });

    if (questions.length > 0) {
      // Create new questions
      const newQuestions = questions.map((question) => {
        return {
          quiz_id: newQuiz._id,
          question_excerpt: question.question_excerpt,
          question_description: question.question_description,
          question_audio: question.question_audio,
          question_image: question.question_image,
          question_video: question.question_video,
          question_point: question.question_point,
          question_time: question.question_time,
          question_explanation: question.question_explanation,
          question_type: question.question_type,
          question_answer_ids: question.question_answer_ids,
          correct_answer_ids: question.correct_answer_ids,
        };
      });

      await questionModel.insertMany(newQuestions);
    }

    return newQuiz;
  }

  // lấy tất cả user_id và trạng thái của isEdit trong shared_user_ids
  async getSharedUserIds({ quiz_id }) {
    // Tìm quiz dựa trên quiz_id và populate thông tin user trong user_id
    const quiz = await quizModel
      .findOne({ _id: quiz_id }) // Tìm tài liệu dựa trên quiz_id
      .populate({
        path: 'shared_user_ids.user_id', // Populate thông tin user từ user_id
        select: 'user_email ', // Loại bỏ các trường nhạy cảm nếu cần
      })
      .exec();

    // Nếu không tìm thấy quiz, ném lỗi
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Trả về shared_user_ids (đã bao gồm thông tin user)
    return quiz.shared_user_ids;
  }

  // xóa user_email trong mảng shared_user_ids dựa trên user_id
  async removeSharedUser({ quiz_id, user_id }) {
    // Kiểm tra quiz tồn tại
    const quiz = await quizModel.findById(quiz_id);
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Xóa user khỏi shared_user_ids
    const result = await quizModel.updateOne(
      { _id: quiz_id },
      { $pull: { shared_user_ids: { user_id } } },
    );

    // Kiểm tra xem có thực sự xóa được không
    if (result.modifiedCount === 0) {
      throw new BadRequestError('User not found or already removed');
    }

    // Lấy danh sách shared_user_ids mới (nếu cần gửi lại phía client)
    const updatedQuiz = await quizModel
      .findById(quiz_id)
      .populate({
        path: 'shared_user_ids.user_id',
        select: 'user_email',
      })
      .exec();

    // Trả về danh sách đã cập nhật hoặc trạng thái thành công
    return updatedQuiz.shared_user_ids;
  }

  // Lấy 5 bộ câu hỏi mới nhất của giáo viên
  async getNewestQuizzes({ user_id }) {
    // Tìm kiếm quiz mới nhất của giáo viên trạng thái khác deleted
    const quizzes = await quizModel
      .find({ user_id, quiz_status: { $ne: 'deleted' } })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo mới nhất
      .limit(5) // Giới hạn số lượng bản ghi
      .lean(); // Tăng hiệu suất khi chỉ lấy dữ liệu gốc

    // Trả về danh sách quiz mới nhất
    return quizzes;
  }
}

module.exports = new QuizService();
