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
}

module.exports = new ResultController();