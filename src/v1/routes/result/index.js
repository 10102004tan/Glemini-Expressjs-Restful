'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const resultController = require('../../controllers/result.controller');

router.get('/result/single',asynHandler(resultController.single));

module.exports = router;