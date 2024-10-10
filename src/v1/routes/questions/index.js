'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const questionController = require('../../controllers/question.controller');
const { uploadQuestions } = require('../../configs/multer.config');
router.post('/create', asynHandler(questionController.create));
router.post('/get', asynHandler(questionController.get));
router.post('/update', asynHandler(questionController.update));
router.post('/get-details', asynHandler(questionController.getDetails));

router.post('/upload', uploadQuestions.single('question_image'), (req, res) => {
	console.log(req.file);
	try {
		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}
		const imageUrl = `http://192.168.1.8:8000/uploads/questions/${req.file.filename}`;
		console.log(imageUrl);
		res.json({ url: imageUrl });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
