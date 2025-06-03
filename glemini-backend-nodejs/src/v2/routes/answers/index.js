/**
 * @file answers/index.js
 * @description Routes for handling question-related operations such as creating, updating, deleting, and searching questions.
 * @author 10102004tan
 * @version 2.0
 */
'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('@v1/auths/utils');
const {authentication} = require('@v1/auths');
const quizController = require('@v2/controllers/quiz.controller');
router.post('/create',asynHandler(authentication), asynHandler(quizController.createAnswer));
module.exports = router;