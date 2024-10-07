'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const questionModel = require('../models/question.model');
const quizModel = require('../models/quiz.model');

class QuizService {
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

	async getQuizByUser({ user_id }) {
		console.log(user_id);
		const quizzies = await quizModel.find({ user_id });
		if (!quizzies) {
			throw new BadRequestError('Quiz not found');
		}

		return quizzies;
	}

	async getQuizById({ quiz_id }) {
		const quiz = await quizModel.findById(quiz_id);
		if (!quiz) {
			throw new BadRequestError('Quiz not found');
		}
		return quiz;
	}

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

	async getQuizDetails({ quiz_id }) {
		console.log(quiz_id)
		const quiz = await quizModel.findById(quiz_id);
		if (!quiz) {
			throw new BadRequestError('Quiz not found');
		}

		return quiz;
	}

	async deleteQuiz({ quiz_id }) {
		const quiz = await quizModel.findByIdAndDelete(quiz_id);
		if (!quiz) {
			throw new BadRequestError('Quiz not found');
		}
		return quiz;
	}

	async updateQuiz({
		quiz_id,
		quiz_name,
		quiz_description,
		subject_id,
		quiz_status,
	}) {
		const quiz = await quizModel.findByIdAndUpdate(
			quiz_id,
			{
				quiz_name,
				quiz_description,
				quiz_status,
			},
			{ new: true }
		);

		if (!quiz) {
			throw new BadRequestError('Quiz not found');
		}

		// Cập nhật thông tin cho trường subject_ids
		if (subject_id) {
			quiz.subject_ids.push(subject_id);
			await quiz.save();
		}

		return quiz;
	}
}

module.exports = new QuizService();
