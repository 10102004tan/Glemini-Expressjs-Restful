'use strict';
const mammoth = require('mammoth');
const { BadRequestError } = require('../cores/error.repsone');
const questionModel = require('../models/question.model');
const quizModel = require('../models/quiz.model');
const fs = require('fs');
const { url } = require('../configs/url.response.config');
const UploadService = require('./upload.service');

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
	async getQuizByUser({ user_id }) {
		const quizzies = await quizModel.find({
			user_id,
			quiz_status: { $ne: 'deleted' }, // Lấy các quiz mà quiz_status khác 'deleted'
		});

		if (!quizzies) {
			throw new BadRequestError('Quiz not found');
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

	async getQuizzesBySubjectIdPublished({ subjectId }) {
		let query = {};
		if (subjectId) {
			try {
				query.subject_ids = { $in: [subjectId] };
			} catch (error) {
				throw new BadRequestError('Invalid subject ID format');
			}
		}

		let quizzes = await quizModel.find(query).populate('user_id');

		if (subjectId === null) {
			quizzes = await quizModel.find({});
		}

		const publishedQuizzes = quizzes.filter(
			(quiz) => quiz.quiz_status === 'published'
		);

		if (publishedQuizzes.length === 0) {
			throw new BadRequestError('No published quizzes found');
		}

		return publishedQuizzes;
	}

	// Hàm lấy 3 bộ quiz có lượt chơi nhiều nhất
	async getQuizzesBanner() {
		const quizzes = await quizModel.find().sort({ quiz_turn: -1 }).limit(3);
		return quizzes.filter((quiz) => quiz.quiz_status === 'published');
	}

	// Search {name-desc} and filter {quiz_turn, date}
	async search({ key }) {
		const quizzes = await quizModel.find();
		if (!quizzes.length < 0) {
			throw new BadRequestError('Quizzes not found');
		}

		if (key) {
			quizzes.filter((quiz) => quiz.quiz_name === key);
		}

		quizzes.filter((quiz) => quiz.quiz_status === 'published');

		return quizzes;
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
		const quiz = await quizModel.findByIdAndUpdate(quiz_id, {
			quiz_status: 'deleted',
		});
		if (!quiz) {
			throw new BadRequestError('Quiz not found');
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
	async uploadQuiz(req, res) {
		if (!req.file) {
			throw new BadRequestError('No file uploaded');
		}

		const uploadUrl = await UploadService.uploadImageFromOneFile({
			path: req.file.path,
			folderName: '/quizzes/' + req.file.filename,
		});

		console.log(uploadUrl);

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

	// Hàm phân tích nội dung và tạo câu hỏi từ file docx
	static parseQuestionsFromText = (text) => {
		// console.log(text);
		const lines = text.split('\n');
		const questions = [];
		let currentQuestion = null;

		lines.forEach((line) => {
			if (line.startsWith('Question:')) {
				if (currentQuestion) {
					questions.push(currentQuestion);
				}
				currentQuestion = {
					question: line.split('Question:')[1].trim(),
					answers: [],
				};
			} else if (line.match(/^[A-Z]\./)) {
				currentQuestion.answers.push(line);
			} else if (line.startsWith('Correct Answer:')) {
				currentQuestion.correctAnswer = line.split(': ')[1];
			}
		});

		if (currentQuestion) {
			questions.push(currentQuestion);
		}

		return questions;
	};

	static parseQuestionsFromMd(text) {
		const lines = text.split('\n'); // Tách nội dung thành từng dòng
		const questions = []; // Mảng để lưu trữ các câu hỏi
		let currentQuestion = null; // Biến để lưu câu hỏi hiện tại

		lines.forEach((line) => {
			// console.log('lien: ' + line);
			// Kiểm tra dòng bắt đầu bằng '## Question'
			if (line.startsWith('## Question:')) {
				// Nếu có câu hỏi hiện tại thì thêm vào mảng câu hỏi
				if (currentQuestion) {
					questions.push(currentQuestion);
				}
				// Tạo một đối tượng câu hỏi mới
				currentQuestion = {
					question: line.split('## Question:')[1].trim(), // Lấy câu hỏi
					answers: [], // Mảng để lưu đáp án
				};
			}
			// Kiểm tra dòng đáp án bắt đầu bằng '-'
			else if (line.match(/^\-   [A-Z]\./)) {
				// console.log('LINE MATCH ANSWER');
				// Lấy đáp án từ dòng bắt đầu bằng '-'
				const answer = line.replace(/^\-   /, '').trim(); // Loại bỏ ký tự '-' và khoảng trắng
				currentQuestion.answers.push(answer); // Lưu đáp án vào mảng
			}
			// Kiểm tra dòng có câu trả lời đúng
			else if (line.startsWith('### Correct Answer:')) {
				// console.log('LINE MATCH CORRECT ANSWER');
				currentQuestion.correctAnswer = line.split(': ')[1].trim(); // Lấy câu trả lời đúng
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
		}

		if (start_filter_date || end_filter_date) {
			query.createdAt = {};
			if (start_filter_date)
				query.createdAt.$gte = new Date(start_filter_date);
			if (end_filter_date)
				query.createdAt.$lte = new Date(end_filter_date);
		}

		// Kiểm tra nếu có danh sách môn học thì thêm vào query
		if (quiz_subjects && quiz_subjects.length > 0) {
			query.subject_ids = { $in: quiz_subjects };
		}
		// Tìm kiếm quiz theo query
		const quizzes = await quizModel.find(query);

		if (!quizzes) {
			throw new BadRequestError('Quizzes not found');
		}
		return quizzes;
	}
}

module.exports = new QuizService();
