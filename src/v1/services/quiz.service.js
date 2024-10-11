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

	async getQuizzesBySubjectIdPublished({ subjectId = null } = {}) {
		const query = { quiz_status: 'published' }; 
	
		if (subjectId) {
			query.subject_ids = subjectId;
		}
	
		const quizzes = await quizModel.find(query);
	
		if (!quizzes || quizzes.length === 0) {
			throw new BadRequestError('No quizzes found');
		}
	
		return quizzes;
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
			// Sử dụng $addToSet để thêm các phần tử mà không có sự trùng lặp
			await quiz.updateOne({
				$addToSet: { subject_ids: { $each: quiz_subjects } },
			});
		}

		// Cập nhật thông tin cho trường quiz_status
		if (quiz_status) {
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
					quiz.quiz_status = 'unpublished';
					break;
			}
			await quiz.save();
		}

		return quiz;
	}
}

module.exports = new QuizService();
