'use strict';
const { CREATED, OK } = require('../cores/success.response');
const quizService = require('../services/quiz.service');

class QuizController {
	createQuiz = async (req, res) => {
		return new CREATED({
			message: 'Quiz created successfully',
			metadata: await quizService.createQuiz(req.body),
		}).send(res);
	};

	getQuizByUser = async (req, res) => {
		return new OK({
			message: 'Quiz fetched successfully',
			metadata: await quizService.getQuizByUser(req.body),
		}).send(res);
	};

	getQuizDetails = async (req, res) => {
		return new OK({
			message: 'Quiz fetched successfully',
			metadata: await quizService.getQuizDetails(req.body),
		}).send(res);
	};

	getQuestionsByQuiz = async (req, res) => {
		return new OK({
			message: 'Questions fetched successfully',
			metadata: await quizService.getQuestionsByQuiz(req.body),
		}).send(res);
	};

	deleteQuiz = async (req, res) => {
		return new OK({
			message: 'Quiz deleted successfully',
			metadata: await quizService.deleteQuiz(req.body),
		}).send(res);
	};
}

module.exports = new QuizController();
