'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const resultController = require('../../controllers/result.controller');

router.post('/result/save-question', resultController.saveQuestion);
router.post('/result/complete-quiz', resultController.completeQuiz);
router.get('/result/single', resultController.single);

module.exports = router;