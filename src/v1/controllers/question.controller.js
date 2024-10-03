'use strict';

const { CREATED } = require('../cores/success.response');
const questionService = require('../services/question.service');

class QuestionController {
	async create(req, res) {
		return new CREATED({
			message: 'Question created successfully',
			metadata: await questionService.create(req.body),
		}).send(res);
	}

	async get(req, res) {
		return new CREATED({
			message: 'Question fetched successfully',
			metadata: await questionService.getQuestionsByQuizId(req.body),
		}).send(res);
	}
}

module.exports = new QuestionController();
