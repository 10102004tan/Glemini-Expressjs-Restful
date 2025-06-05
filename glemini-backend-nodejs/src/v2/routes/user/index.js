'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('@v1/auths/utils');
const userController = require('@v2/controllers/user.controller');
const { authentication } = require('@v1/auths');

router.put('/update', asynHandler(authentication),asynHandler(userController.update));
router.get('/info', asynHandler(authentication),asynHandler(userController.info));

module.exports = router;
