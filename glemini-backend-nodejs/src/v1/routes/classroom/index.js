'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const { uploadExcel } = require('../../configs/multer.config');

const classroomController = require('../../controllers/classroom.controller');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/create', asynHandler(classroomController.createClassroom));
router.post('/info', asynHandler(classroomController.getClassroomById));
router.post('/teacher', asynHandler(classroomController.getClassroomsByTeacherId));
router.post('/student', asynHandler(classroomController.getClassroomsByStudentId));
router.delete('/rm-student/:classroomId/students/:studentId', asynHandler(classroomController.removeStudent));

router.post('/upload', 
    uploadExcel.single('file'), 
    asynHandler(classroomController.uploadExcel));

module.exports = router;