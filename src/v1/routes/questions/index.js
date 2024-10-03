'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const questionController = require('../../controllers/question.controller');
const upload = require('../../configs/multer.config');

router.post('/create', asynHandler(questionController.create));
router.post('/get', asynHandler(questionController.get));
router.post('/update', asynHandler(questionController.update));
router.post('/get-details', asynHandler(questionController.getDetails));
router.post(
	'/upload',
	upload.single('myFile'),
	asynHandler(questionController.uploadQuizIamges)
);

module.exports = router;
