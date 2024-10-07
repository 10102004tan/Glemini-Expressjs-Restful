'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const quizController = require('../../controllers/quiz.controller');

router.post('/create', asynHandler(quizController.createQuiz));
router.post('/delete', asynHandler(quizController.deleteQuiz));
router.post('/update', asynHandler(quizController.updateQuiz));
router.post('/get-by-user', asynHandler(quizController.getQuizByUser));
router.post('/get-details', asynHandler(quizController.getQuizDetails));
router.post('/get-questions', asynHandler(quizController.getQuestionsByQuiz));

module.exports = router;
