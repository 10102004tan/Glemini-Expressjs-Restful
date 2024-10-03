'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const resultController = require('../../controllers/result.controller');

router.post('/save-question', resultController.saveQuestion);
router.post('/complete-quiz', resultController.completeQuiz);
router.get('/single', resultController.single);

module.exports = router;