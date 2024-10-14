'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const quizController = require('../../controllers/quiz.controller');
const { uploadQuizzes, uploadDocs } = require('../../configs/multer.config');
const templateRouter = require('../template');

router.post('/create', asynHandler(quizController.createQuiz));
router.post('/delete', asynHandler(quizController.deleteQuiz));
router.post('/update', asynHandler(quizController.updateQuiz));
router.post('/get-by-user', asynHandler(quizController.getQuizByUser));
router.post('/get-details', asynHandler(quizController.getQuizDetails));
router.post('/get-questions', asynHandler(quizController.getQuestionsByQuiz));
router.use('/get-docs-template', templateRouter);
router.post('/filter', asynHandler(quizController.filterQuizzes));

router.post(
	'/upload',
	uploadQuizzes.single('quiz_image'),
	asynHandler(quizController.uploadQuiz)
);

router.post(
	'/docs/upload',
	uploadDocs.single('file'),
	asynHandler(quizController.uploadDoc)
);

module.exports = router;
