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
router.post('/get-results', asynHandler(resultController.getResultsByRoomId));
router.post('/get-rank', asynHandler(resultController.getUserRank));
router.post(
	'/update-result',
	asynHandler(resultController.updateResultWhileRealtimePlay)
);
router.post('/overview', asynHandler(resultController.overview));
router.post('/reports', asynHandler(resultController.getReportResults));
router.post('/rank', asynHandler(resultController.getRankBoard));
router.post('/reset', asynHandler(resultController.resetResultRoom));

module.exports = router;
