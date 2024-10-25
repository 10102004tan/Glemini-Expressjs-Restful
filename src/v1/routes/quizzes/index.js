'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const quizController = require('../../controllers/quiz.controller');
const { uploadQuizzes, uploadDocs } = require('../../configs/multer.config');
const templateRouter = require('../template');
const { authentication } = require('../../auths');
const { model } = require('../../configs/gemini.config');

router.use('/get-templates', templateRouter);

// AUTHENTICATION
router.use(asynHandler(authentication));
// AUTHENTICATION

router.post(
	'/upload',
	uploadQuizzes.single('file'),
	asynHandler(quizController.uploadQuiz)
);

router.post(
	'/docs/upload',
	uploadDocs.single('file'),
	asynHandler(quizController.uploadDoc)
);

router.post(
	'/md/upload',
	uploadDocs.single('file'),
	asynHandler(quizController.uploadMd)
);

router.post('/create', asynHandler(quizController.createQuiz));
router.post('/delete', asynHandler(quizController.deleteQuiz));
router.post('/update', asynHandler(quizController.updateQuiz));
router.post('/get-by-user', asynHandler(quizController.getQuizByUser));
router.post('/get-details', asynHandler(quizController.getQuizDetails));
router.post('/get-questions', asynHandler(quizController.getQuestionsByQuiz));
router.post('/filter', asynHandler(quizController.filterQuizzes));
router.post('/banner', asynHandler(quizController.getQuizzesBanner));
router.post('/search', asynHandler(quizController.search));
router.post(
	'/gemini/generate/prompt',
	asynHandler(quizController.geminiCreateQuestionByPrompt)
);
router.post(
	'/published',
	asynHandler(quizController.getQuizzesBySubjectPublished)
);

module.exports = router;
