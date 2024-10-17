'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const resultController = require('../../controllers/result.controller');

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/save-question', resultController.saveQuestion);
router.post('/complete-quiz', resultController.completeQuiz);
router.post('/review', resultController.review);

module.exports = router;
