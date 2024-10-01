'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const questionController = require('../../controllers/question.controller');

router.post('/create', asynHandler(questionController.create));
router.post('/get', asynHandler(questionController.get));

module.exports = router;
