'use strict';
const { CREATED, OK } = require('../cores/success.response');
const resultService = require('../services/result.service');

class ResultController {
	// Save a single question result
	saveQuestion = async (req, res) => {
		const result = await resultService.saveQuestion(req.body);
		return new OK({
			message: 'Saved question result successfully!',
			metadata: result,
		}).send(res);
	};

	// Complete the quiz
	completeQuiz = async (req, res) => {
		const result = await resultService.completeQuiz(req.body);
		return new OK({
			message: 'Quiz completed successfully!',
			metadata: result,
		}).send(res);
	};

	// Get review result
	review = async (req, res) => {
		return new OK({
			message: 'Read result successfully!',
			metadata: await resultService.review(req.body),
		}).send(res);
	};

	async getResultsByRoomId(req, res) {
		return new OK({
			message: 'Read result successfully!',
			metadata: await resultService.getResultsByRoomId(req.body),
		}).send(res);
	}

	async updateResultWhileRealtimePlay(req, res) {
		return new OK({
			message: 'Update result successfully!',
			metadata: await resultService.updateResultWhileRealtimePlay(
				req.body
			),
		}).send(res);
	}

	async getUserRank(req, res) {
		return new OK({
			message: 'Update result successfully!',
			metadata: await resultService.getUserRank(req.body),
		}).send(res);
	}
	overview = async (req, res) => {
		return new OK({
			message: 'Read overview successfully!',
			metadata: await resultService.overview(req.body),
		}).send(res);
	};

	async getResultsByUserId(req, res) {
		return new OK({
			message: 'Get result by user successfully!',
			metadata: await resultService.getResultsByUserId(req.body),
		}).send(res);
	}

	async getReportResults(req, res) {
		return new OK({
			message: 'Get report results by teacher successfully!',
			metadata: await resultService.getReportResults(req.body),
		}).send(res);
	}
}

module.exports = new ResultController();
