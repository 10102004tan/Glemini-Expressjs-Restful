'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../../v1/auths/utils');
const quizController = require('../../controllers/quiz.controller');
router.post('/search', asynHandler(quizController.search));
module.exports = router;
