'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const exerciseController = require('../../controllers/exercises.controller');
const { uploadQuestions } = require('../../configs/multer.config');
const { authentication } = require('../../auths');

router.use(asynHandler(authentication));


module.exports = router;
