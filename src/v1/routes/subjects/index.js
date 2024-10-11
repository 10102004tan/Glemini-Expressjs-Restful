'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const subjectController = require('../../controllers/subject.controller');

router.post('', subjectController.getSubjects);

module.exports = router;
