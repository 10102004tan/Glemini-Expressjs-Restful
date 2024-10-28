'use strict';

const { CREATED, OK } = require('../cores/success.response');
const questionService = require('../services/question.service');

class QuestionController {
	async create(req, res) {
		return new CREATED({
			message: 'Question created successfully',
			metadata: await questionService.create(req.body),
		}).send(res);
	}

	async creates(req, res) {
		return new CREATED({
			message: 'Question created successfully',
			metadata: await questionService.creates(req.body),
		}).send(res);
	}

	async update(req, res) {
		return new OK({
			message: 'Question created successfully',
			metadata: await questionService.update(req.body),
		}).send(res);
	}

	async get(req, res) {
		return new OK({
			message: 'Question fetched successfully',
			metadata: await questionService.getQuestionsByQuizId(req.body),
		}).send(res);
	}

	async getDetails(req, res) {
		return new OK({
			message: 'Question fetched successfully',
			metadata: await questionService.getQuestionsById(req.body),
		}).send(res);
	}

	async uploadQuizIamges(req, res) {
		return new OK({
			message: 'Question fetched successfully',
			metadata: await questionService.uploadQuestionImages(req, res),
		}).send(res);
	}

	async uploadQuestionImages(req, res) {
		return new OK({
			message: 'Question fetched successfully',
			metadata: await questionService.uploadQuestionImages(req.body),
		}).send(res);
	}

	async delete(req, res) {
		return new OK({
			message: 'Question fetched successfully',
			metadata: await questionService.delete(req.body),
		}).send(res);
	}
}

module.exports = new QuestionController();
