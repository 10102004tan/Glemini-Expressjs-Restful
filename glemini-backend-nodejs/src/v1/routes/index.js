'use strict';

const express = require('express');
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

router.get('/working', (req, res, next) => {
  res
    .send({
      message: 'It works!',
      metadata: [],
    })
    .status(200);
});
router.use('', require('./email'));
router.use('/uploads', routerUpload);
router.use('/rbac', require('./rbac'));
router.use('/schools', routeSchool);
router.use('', routeAdmin);
router.use('/auth', routeAccess);
router.use('/notification', routeNotification);
router.use('/quizzes', routeQuizzes);
router.use('/collections', routeCollection);
router.use('/questions', routeQuestions);
router.use('/subjects', routeSubjects);
router.use('/user', routeUser);
router.use('/result', routeResult);
router.use('/classroom', routeClassroom);
router.use('/exercise', routeExercise);
router.use('/room', routeRoom);
// router.use('/api/v2/auth', require('./accessV2'));
// router.use('/api/v2/system', require('./system'));

module.exports = router;
