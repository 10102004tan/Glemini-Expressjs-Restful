'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const questionController = require('../../controllers/question.controller');
const { uploadQuestions } = require('../../configs/multer.config');
const { authentication } = require('../../auths');

router.use(asynHandler(authentication));

router.post('/create', asynHandler(questionController.create));
router.post('/creates', asynHandler(questionController.creates));
router.post('/delete', asynHandler(questionController.delete));
router.post('/get', asynHandler(questionController.get));
router.post('/update', asynHandler(questionController.update));
router.post('/get-details', asynHandler(questionController.getDetails));
router.post(
  '/upload',
  uploadQuestions.single('file'),
  asynHandler(questionController.uploadQuizIamges),
);

module.exports = router;
