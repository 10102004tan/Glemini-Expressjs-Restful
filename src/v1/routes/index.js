'use strict';

const express = require('express');
const router = express.Router();
const routeAccess = require('./access');
const routeQuizzes = require('./quizzes');
const routeQuestions = require('./questions');
const routeResult = require('./result');
const routeSubjects = require('./subjects');
const routerUpload = require('./upload');

router.use('/api/v1/quizzes', routeQuizzes);
router.use('/api/v1/questions', routeQuestions);
router.use('/api/v1/subjects', routeSubjects);
router.use('/api/v1/auth', routeAccess);
router.use('/api/v1/result', routeResult);
router.use('/api/v1/uploads', routerUpload);

router.get('/', (req, res, next) => {
	res.send({
		message: 'It works!',
		metadata: [],
	});
});

module.exports = router;
