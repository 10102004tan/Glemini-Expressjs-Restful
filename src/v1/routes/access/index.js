'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const accessController = require('../../controllers/access.controller');

router.post('/signup',asynHandler(accessController.signup));
router.post('/login',asynHandler(accessController.login));

module.exports = router;