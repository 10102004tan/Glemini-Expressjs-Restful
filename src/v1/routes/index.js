'use strict';

const express = require('express');
const { type } = require('os');
const { asynHandler } = require('../auths/utils');
const router = express.Router();
const routeAccess = require('./access');
const routeQuizzes = require('./quizzes');
const routeQuestions = require('./questions');

router.use('/api/v1/quizzes', routeQuizzes);
router.use('/api/v1/questions', routeQuestions);
router.use('/api/v1/', routeAccess);

router.get('/', (req, res, next) => {
	res.send({
		message: 'It works!',
		metadata: [],
	});
});

module.exports = router;
