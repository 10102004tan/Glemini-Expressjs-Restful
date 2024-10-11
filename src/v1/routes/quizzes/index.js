'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const quizController = require('../../controllers/quiz.controller');
const { uploadQuizzes } = require('../../configs/multer.config');

router.post('/create', asynHandler(quizController.createQuiz));
router.post('/delete', asynHandler(quizController.deleteQuiz));
router.post('/update', asynHandler(quizController.updateQuiz));
router.post('/get-by-user', asynHandler(quizController.getQuizByUser));
router.post('/get-details', asynHandler(quizController.getQuizDetails));
router.post('/get-questions', asynHandler(quizController.getQuestionsByQuiz));
router.post('/upload', uploadQuizzes.single('quiz_image'), (req, res) => {
	console.log(req.file);
	try {
		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}
		const imageUrl = `http://192.168.1.8:8000/uploads/quizzes/${req.file.filename}`;
		res.json({ url: imageUrl });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
