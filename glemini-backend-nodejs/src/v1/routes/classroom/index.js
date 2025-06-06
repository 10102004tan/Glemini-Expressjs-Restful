'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const { uploadExcel } = require('../../configs/multer.config');
const templateRouter = require('../template');
const classroomController = require('../../controllers/classroom.controller');

router.use('/get-templates', templateRouter);

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/create', asynHandler(classroomController.createClassroom));
router.post('/info', asynHandler(classroomController.getClassroomById));
router.post('/teacher', asynHandler(classroomController.getClassroomsByTeacherId));
router.post('/student', asynHandler(classroomController.getClassroomsByStudentId));
router.post('/add-student', asynHandler(classroomController.addStudent));
router.post('/add-quiz', asynHandler(classroomController.addQuizToClassroom));
router.delete(
  '/rm-student/:classroomId/students/:studentId',
  asynHandler(classroomController.removeStudent),
);
router.delete('/delete/:classroomId', asynHandler(classroomController.deleteClassroom));
router.post('/notify-student', asynHandler(classroomController.notifyStudentWhenTeacherCreateRoom));

router.post('/upload', uploadExcel.single('file'), asynHandler(classroomController.uploadExcel));

module.exports = router;
