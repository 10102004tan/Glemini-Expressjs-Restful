'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const quizModel = require('../models/quiz.model');
class QuizService {
	static async createQuiz(quiz) {
		const newQuiz = await quizModel.create(quiz);
		if (!newQuiz) {
			throw new BadRequestError('Quiz not created');
		}
		return newQuiz;
	}
}

module.exports = QuizService;
