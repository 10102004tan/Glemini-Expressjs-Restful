'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const subjectController = require('../../controllers/subject.controller');

router.post('/get-subjects', subjectController.getSubjects);
router.post('/get-subject', subjectController.getSubject);

module.exports = router;
