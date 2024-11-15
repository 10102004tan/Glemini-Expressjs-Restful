'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const exerciseController = require('../../controllers/exercises.controller');
const { authentication } = require('../../auths');

// AUTHENTICATION
// router.use(asynHandler(authentication));
// AUTHENTICATION

router.post("/report", asynHandler(exerciseController.detailExercise));

module.exports = router;
