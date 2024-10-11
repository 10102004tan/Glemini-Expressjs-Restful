'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const quizController = require('../../controllers/quiz.controller');
const { uploadQuizzes, uploadDocs } = require('../../configs/multer.config');
const mammoth = require('mammoth');

router.post('/create', asynHandler(quizController.createQuiz));
router.post('/delete', asynHandler(quizController.deleteQuiz));
router.post('/update', asynHandler(quizController.updateQuiz));
router.post('/get-by-user', asynHandler(quizController.getQuizByUser));
router.post('/get-details', asynHandler(quizController.getQuizDetails));
router.post('/get-questions', asynHandler(quizController.getQuestionsByQuiz));
router.post('/get-quizpublished', asynHandler(quizController.getQuizzesBySubjectPublished));
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

router.post('/docs/upload', uploadDocs.single('docs_template'), (req, res) => {
	try {
		console.log('Request Body:', req.body); // Kiểm tra body của request
		console.log('Uploaded File:', req.file); // Kiểm tra thông tin của file

		if (req.file) {
			const filePath = req.file.path;
			console.log('File path:', filePath); // Đảm bảo file đã được lưu đúng cách
			// const result = await mammoth.extractRawText({ path: filePath });
			// const questions = parseQuestionsFromText(result.value);
			res.status(200).json({
				message: 'File processed successfully',
				//	questions,
			});
		} else {
			res.status(400).json({ message: 'No file uploaded' });
		}
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ message: 'Error processing file' });
	}
});

// Hàm phân tích nội dung và tạo câu hỏi
const parseQuestionsFromText = (text) => {
	const lines = text.split('\n');
	const questions = [];
	let currentQuestion = null;

	lines.forEach((line) => {
		if (line.startsWith('Question')) {
			if (currentQuestion) {
				questions.push(currentQuestion);
			}
			currentQuestion = { question: line, answers: [] };
		} else if (line.match(/^[A-Z]\./)) {
			currentQuestion.answers.push(line);
		} else if (line.startsWith('Correct Answer:')) {
			currentQuestion.correctAnswer = line.split(': ')[1];
		}
	});

	if (currentQuestion) {
		questions.push(currentQuestion);
	}

	return questions;
};

module.exports = router;
