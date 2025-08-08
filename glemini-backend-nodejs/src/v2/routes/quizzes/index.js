'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('@v1/auths/utils');
const { authentication } = require('@v1/auths');
const quizController = require('@v2/controllers/quiz.controller');


// Public routes
router.post('/search', asynHandler(quizController.search));
router.get('/:quizId/questions', asynHandler(quizController.getQuestionsByQuiz));
router.post('/:quizId/questions', asynHandler(quizController.getQuestionsByQuiz));

// Protected routes - require authentication
router.use(asynHandler(authentication));

// Specific routes first (to avoid conflict with /:quizId)
router.get('/in-library', asynHandler(quizController.getQuizzesByUser));
router.post('/create', asynHandler(quizController.create));
router.get('/:quizId', asynHandler(quizController.getDetails));
router.put('/:quizId', asynHandler(quizController.update));
router.delete('/:quizId', asynHandler(quizController.delete));
router.post('/:quizId/duplicate', asynHandler(quizController.duplicate));


module.exports = router;
