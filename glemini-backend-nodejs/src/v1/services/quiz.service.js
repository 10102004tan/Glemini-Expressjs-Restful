"use strict";
const mammoth = require("mammoth");
const { BadRequestError } = require("../cores/error.repsone");
const questionModel = require("../models/question.model");
const quizModel = require("../models/quiz.model");
const subjectModel = require("../models/subject.model");
const fs = require("fs");

const { url } = require("../configs/url.response.config");
const UploadService = require("./upload.service");
const { model } = require("../configs/gemini.config");
const { Types: { ObjectId } } = require('mongoose')

class QuizService {
  // Hàm tạo quiz
  async createQuiz({ user_id, quiz_name, quiz_description }) {
    const newQuiz = await quizModel.create({
      user_id,
      quiz_name,
      quiz_description,
    });

    if (!newQuiz) {
      throw new BadRequestError("Quiz not created");
    }
    return newQuiz;
  }

  // Hàm lấy danh sách quiz theo user
  async getQuizByUser({ user_id, skip = 0, limit = 2 }) {
    const quizzies = await quizModel
      .find({
        user_id,
        quiz_status: { $ne: "deleted" }, // Lấy các quiz mà quiz_status khác 'deleted'
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!quizzies) {
      throw new BadRequestError("Quiz not found");
    }

    return quizzies;
  }

  // Hàm lấy thông tin quiz theo id
  async getQuizById({ quiz_id }) {
    const quiz = await quizModel.findById(quiz_id);
    if (!quiz) {
      throw new BadRequestError("Quiz not found");
    }
    return quiz;
  }

  // Hàm lấy danh sách câu hỏi theo quiz
  async getQuestionsByQuiz({ quiz_id }) {
    const questions = await questionModel
      .find({ quiz_id })
      .populate("question_answer_ids")
      .populate("correct_answer_ids")
      .exec();

    if (!questions) {
      throw new BadRequestError("Questions not found");
    }

    return questions;
  }

  // Hàm lấy danh sách quiz theo môn học
  async getQuizzesBySubjectIdPublished() {
    // Get all subjects
    const subjects = await subjectModel.find({});
    const results = [];

    // Loop through each subject to get up to 4 published quizzes
    for (const subject of subjects) {
        const quizzes = await quizModel
            .find({
                quiz_status: "published",
                subject_ids: { $in: [subject._id] }
            })
            .populate("user_id")
            .sort({ createdAt: -1 })
            .limit(4); // Limit to 4 quizzes per subject

        if (quizzes.length > 0) {
            results.push({
                subject: subject,
                quizzes: quizzes
            });
        }
    }

    return results;
}




  // Hàm lấy 3 bộ quiz có lượt chơi nhiều nhất
  async getQuizzesBanner() {
    const quizzes = await quizModel.find().sort({ quiz_turn: -1 }).limit(3);
    return quizzes.filter((quiz) => quiz.quiz_status === "published");
  }

	// Search {name-desc} and filter {quiz_turn, date}
	async search({ key,skip=0,limit=20,sortStatus=1,quiz_on=-1,subjectIds }) {
		const query = {};
		if (key) {
			query.quiz_name = { $regex: key, $options: 'i' };
		}

    // get quiz published
    query.quiz_status = "published";

    // get quiz by subject : quiz.subject_ids = [1,2,3,4] ; subjectIds = [1,2]
    if (subjectIds && subjectIds.length > 0) {
      subjectIds = subjectIds.map((subjectId) => ObjectId.createFromHexString(subjectId));
      query.subject_ids = { $in: subjectIds };
    } 
    
    


    if (quiz_on !== -1) {
      query.quiz_turn = { $gte: quiz_on };
    }
		const quizzes = await quizModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "quiz_id",
          as: "questions",
        },
      },
        {
          // lookup with user and unwind
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
      },{
        $unwind: "$user",
      },
      {
        $project: {
          quiz_name: 1,
          quiz_description: 1,
          quiz_thumb: 1,
          quiz_turn: 1,
          quiz_status: 1,
          createdAt: 1,
          subject_ids: 1,
          user_avatar: "$user.user_avatar",
          user_fullname: "$user.user_fullname",
          question_count: { $size: "$questions" }, // Count of questions
        },
      },
      {
        $match: { question_count: { $gt: 0 } },
      },
      { $sort: { createdAt: sortStatus } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return quizzes;
	}

  // Hàm lấy thông tin chi tiết của quiz
  async getQuizDetails({ quiz_id }) {
    // console.log(quiz_id);
    const quiz = await quizModel.findById(quiz_id);
    if (!quiz) {
      throw new BadRequestError("Quiz not found");
    }

    return quiz;
  }

  // Hàm xóa quiz
  async deleteQuiz({ quiz_id }) {
    const quiz = await quizModel.findByIdAndUpdate(quiz_id, {
      quiz_status: "deleted",
    });
    if (!quiz) {
      throw new BadRequestError("Quiz not found");
    }
    return quiz;
  }

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
      { new: true }
    );

    if (!quiz) {
      throw new BadRequestError("Quiz not found");
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
        case "published":
          quiz.quiz_status = "published";
          break;
        case "unpublished":
          quiz.quiz_status = "unpublished";
          break;
        case "deleted":
          quiz.quiz_status = "deleted";
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
      throw new BadRequestError("No file uploaded");
    }

    const uploadUrl = await UploadService.uploadImageFromOneFile({
      path: req.file.path,
      folderName: "/quizzes/" + req.file.filename,
    });

    return uploadUrl;
  }

  // Hàm upload file docx
  async uploadDoc(req, res) {
    if (!req.file) {
      throw new BadRequestError("No file uploaded");
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
      throw new BadRequestError("No file uploaded");
    }

    const filePath = req.file.path; // Lấy đường dẫn của tệp đã tải lên

    // Đọc nội dung của tệp Markdown
    const fileContent = fs.readFileSync(filePath, "utf-8"); // Đọc tệp và chuyển đổi sang chuỗi

    // Phân tích các câu hỏi từ nội dung tệp Markdown
    const questions = QuizService.parseQuestionsFromMd(fileContent);
    return questions; // Trả về các câu hỏi đã phân tích
  }

  // Hàm upload file md
  async uploadTxt(req, res) {
    if (!req.file) {
      throw new BadRequestError("No file uploaded");
    }

    const filePath = req.file.path; // Lấy đường dẫn của tệp đã tải lên

    // Đọc nội dung của tệp Markdown
    const fileContent = fs.readFileSync(filePath, "utf-8"); // Đọc tệp và chuyển đổi sang chuỗi

    // Phân tích các câu hỏi từ nội dung tệp Markdown
    const questions = QuizService.parseQuestionsFromText(fileContent);
    return questions; // Trả về các câu hỏi đã phân tích
  }

  // Hàm phân tích nội dung và tạo câu hỏi từ file docx
  static parseQuestionsFromText = (text) => {
    console.log(text);
    const lines = text.split("\n");
    const questions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      line = line.replace("\r", "");
      if (line.startsWith("Question:")) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: line.split("Question:")[1].trim(),
          answers: [],
        };
      } else if (line.startsWith("Answer: ")) {
        currentQuestion.answers.push(line.split("Answer: ")[1]);
      } else if (line.startsWith("Correct Answer:")) {
        currentQuestion.correctAnswer = line.split(": ")[1];
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  // Hàm phân tích nội dung và tạo câu hỏi từ file md
  static parseQuestionsFromMd(text) {
    const lines = text.split("\n"); // Tách nội dung thành từng dòng
    const questions = []; // Mảng để lưu trữ các câu hỏi
    let currentQuestion = null; // Biến để lưu câu hỏi hiện tại

    lines.forEach((line) => {
      // console.log('lien: ' + line);
      // Kiểm tra dòng bắt đầu bằng '## Question'
      if (line.startsWith("## Question:")) {
        // Nếu có câu hỏi hiện tại thì thêm vào mảng câu hỏi
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        // Tạo một đối tượng câu hỏi mới
        currentQuestion = {
          question: line.split("## Question:")[1].trim(), // Lấy câu hỏi
          answers: [], // Mảng để lưu đáp án
        };
      }
      // Kiểm tra dòng đáp án bắt đầu bằng '-'
      else if (line.match(/^\-   [A-Z]\./)) {
        // console.log('LINE MATCH ANSWER');
        // Lấy đáp án từ dòng bắt đầu bằng '-'
        const answer = line.replace(/^\-   /, "").trim(); // Loại bỏ ký tự '-' và khoảng trắng
        currentQuestion.answers.push(answer); // Lưu đáp án vào mảng
      }
      // Kiểm tra dòng có câu trả lời đúng
      else if (line.startsWith("### Correct Answer:")) {
        // console.log('LINE MATCH CORRECT ANSWER');
        currentQuestion.correctAnswer = line.split(": ")[1].trim(); // Lấy câu trả lời đúng
      }
    });

    // Nếu vẫn còn câu hỏi hiện tại thì thêm vào mảng câu hỏi
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions; // Trả về mảng câu hỏi
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
  }) {
    // Kiểm tra nếu không có id người dùng thì trả về lỗi
    if (!user_id) {
      throw new BadRequestError("User ID is required");
    }
    // Tạo query để tìm kiếm
    let query = { user_id };
    // Kiểm tra nếu có tên quiz thì thêm vào query
    if (quiz_name) {
      query.quiz_name = { $regex: quiz_name, $options: "i" };
    }
    // Kiểm tra nếu có trạng thái quiz thì thêm vào query
    if (quiz_status) {
      query.quiz_status = quiz_status;
    }

    if (start_filter_date || end_filter_date) {
      query.createdAt = {};
      if (start_filter_date) query.createdAt.$gte = new Date(start_filter_date);
      if (end_filter_date) query.createdAt.$lte = new Date(end_filter_date);
    }

    // Kiểm tra nếu có danh sách môn học thì thêm vào query
    if (quiz_subjects && quiz_subjects.length > 0) {
      query.subject_ids = { $in: quiz_subjects };
    }

    query.quiz_status = { $ne: "deleted" }; // Lấy các quiz mà quiz_status khác 'deleted'
    // Tìm kiếm quiz theo query
    const quizzes = await quizModel.find(query);

    if (!quizzes) {
      throw new BadRequestError("Quizzes not found");
    }
    return quizzes;
  }

  // Hàm tạo ra bộ câu hỏi từ gemini AI theo prompt
  async geminiCreateQuestionByPrompt({ prompt }) {
    // Kiểm tra nếu không có prompt thì trả về lỗi
    if (!prompt) {
      throw new BadRequestError("Prompt is required");
    }
    // Tạo câu hỏi từ prompt
    const result = await model.generateContent(prompt);
    // Trả về câu hỏi vừa tạo
    return JSON.parse(result.response.text());
  }

  // Hàm tạo câu hỏi từ gemini AI theo prompt dữ liệu trả về dạng stream
  geminiCreateQuestionByPromptStream = async (req, res) => {
    const { prompt } = req.body;

    // Kiểm tra nếu không có prompt
    if (!prompt) {
      throw new Error("Prompt is required");
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
      throw new BadRequestError("No file uploaded");
    }

    const fileName = req.file.filename;
    const prompt = req.body.prompt;

    if (!prompt) {
      throw new BadRequestError("Prompt is required");
    }

    const image = {
      inlineData: {
        data: Buffer.from(
          fs.readFileSync("src/v1/uploads/geminies/" + fileName)
        ).toString("base64"),
        mimeType: file.mimetype,
      },
    };

    const result = await model.generateContent([prompt, image]);
    const response = JSON.parse(result.response.text());
    return response;
  }
  //lấy tất cả quiz mà shared_user_ids có chứa user_id
  async getAllQuizShared({ user_id }) {
    const quizzies = await quizModel.find({
      shared_user_ids: { $elemMatch: { user_id: user_id } },
      quiz_status: { $ne: "deleted" },
    });

    if (quizzies.length === 0) {
      // Kiểm tra mảng không rỗng
      throw new BadRequestError("No shared quizzes found");
    }

    return quizzies;
  }

  //Hàm xóa quiz đã chia sẻ dựa trên user_id
  async removeQuizShared({ user_id, quiz_id }) {
    const quiz = await quizModel.updateOne(
      { _id: quiz_id },
      { $pull: { shared_user_ids: { user_id } } } // Đảm bảo chỉ truyền `user_id` mà không có đối tượng { user_id }
    );

    if (quiz.modifiedCount === 0) {
      throw new BadRequestError("Quiz not found or user not shared");
    }

    return quiz;
  }

  //sao chép lại tất cả thông tin cùa quiz đã chia sẻ
  async copyQuizShared({ user_id, quiz_id }) {
    const quiz = await quizModel.findOne({ _id: quiz_id });

    if (!quiz) {
      throw new BadRequestError("Quiz not found");
    }

    const newQuiz = await quizModel.create({
      user_id,
      quiz_name: quiz.quiz_name + " (copy)",
      quiz_description: quiz.quiz_description,
      quiz_thumb: quiz.quiz_thumb,
      subject_ids: quiz.subject_ids,
      quiz_status: "unpublished",
      quiz_turn: quiz.quiz_turn,
    });

    if (!newQuiz) {
      throw new BadRequestError("Quiz not created");
    }

    return newQuiz;
  }
}

module.exports = new QuizService();
