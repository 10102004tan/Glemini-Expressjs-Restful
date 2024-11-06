'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const resultController = require('../../controllers/result.controller');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/student', asynHandler(resultController.getResultsByUserId));
router.post('/save-question', asynHandler(resultController.saveQuestion));
router.post('/complete-quiz', asynHandler(resultController.completeQuiz));
router.post('/review', asynHandler(resultController.review));
router.post('/reports', asynHandler(resultController.getReportResults));

module.exports = router;
