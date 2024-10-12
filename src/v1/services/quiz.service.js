'use strict';
const mammoth = require('mammoth');
const { BadRequestError } = require('../cores/error.repsone');
const questionModel = require('../models/question.model');
const quizModel = require('../models/quiz.model');

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
		console.log(user_id);
		const quizzies = await quizModel.find({ user_id });
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
			.exec(); // Sử dụng exec để truy vấn

		if (!questions || questions.length === 0) {
			throw new BadRequestError('Questions not found');
		}

		return questions;
	}

	// Hàm lấy thông tin chi tiết của quiz
	async getQuizDetails({ quiz_id }) {
		const quiz = await quizModel.findById(quiz_id);
		if (!quiz) {
			throw new BadRequestError('Quiz not found');
		}

		return quiz;
	}

	// Hàm xóa quiz
	async deleteQuiz({ quiz_id }) {
		const quiz = await quizModel.findByIdAndDelete(quiz_id);
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
			switch (quiz_status) {
				case '0' || 'published':
					quiz.quiz_status = 'published';
					break;
				case '1' || 'unpublished':
					quiz.quiz_status = 'unpublished';
					break;
				case '2' || 'deleted':
					quiz.quiz_status = 'deleted';
					break;
				default:
					quiz.quiz_status = 'unpublished';
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
		const imageUrl = `http://192.168.1.8:8000/api/v1/uploads/quizzes/${req.file.filename}`;
		return imageUrl;
	}

	// Hàm upload file docx
	async uploadDoc(req, res) {
		// console.log(req.file);
		if (!req.file) {
			throw new BadRequestError('No file uploaded');
		}

		const filePath = req.file.path;
		const result = await mammoth.extractRawText({ path: filePath });
		const questions = QuizService.parseQuestionsFromText(result.value);
		return questions;
	}

	// Hàm phân tích nội dung và tạo câu hỏi từ file docx
	static parseQuestionsFromText = (text) => {
		const lines = text.split('\n');
		const questions = [];
		let currentQuestion = null;

		lines.forEach((line) => {
			if (line.startsWith('Question')) {
				if (currentQuestion) {
					questions.push(currentQuestion);
				}
				currentQuestion = { question: line, answers: [] };
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
}

module.exports = new QuizService();
