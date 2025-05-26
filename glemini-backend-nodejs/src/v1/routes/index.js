"use strict";

const express = require("express");
const router = express.Router();
const routeAccess = require('./access');
const routeQuizzes = require('./quizzes');
const routeQuestions = require('./questions');
const routeResult = require('./result');
const routeSubjects = require('./subjects');
const routeUser = require('./user');
const routeSchool = require('./school');
const routerUpload = require('./upload');
const routeAdmin = require('./admin');
const routeNotification = require('./notification');

const routeCollection = require('./collection');
const routeClassroom = require('./classroom');
const routeExercise = require('./exercise');
const routeRoom = require('./room');

router.get('/api/v1/working', (req, res, next) => {
	res.send({
		message: 'It works!',
		metadata: [],
	}).status(200);
});
router.use('/api/v1', require('./email'));
router.use('/api/v1/uploads', routerUpload);
router.use('/api/v1/rbac', require('./rbac'));
router.use('/api/v1/schools', routeSchool);
router.use('/api/v1', routeAdmin);
router.use('/api/v1/auth', routeAccess);
router.use('/api/v1/notification', routeNotification);
router.use('/api/v1/quizzes', routeQuizzes);
router.use('/api/v1/collections', routeCollection);
router.use('/api/v1/questions', routeQuestions);
router.use('/api/v1/subjects', routeSubjects);
router.use('/api/v1/user', routeUser);
router.use('/api/v1/result', routeResult);
router.use('/api/v1/classroom', routeClassroom);
router.use('/api/v1/exercise', routeExercise);
router.use('/api/v1/room', routeRoom);
router.use('/api/v2/auth', require('./accessV2'));
router.use('/api/v2/system', require('./system'));

module.exports = router;
