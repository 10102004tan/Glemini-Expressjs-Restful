'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const accessController = require('../../controllers/access.controller');
const {authentication} = require('../../auths');

router.post('/signup',asynHandler(accessController.signup));
router.post('/login',asynHandler(accessController.login));

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */


router.post('/logout', asynHandler(accessController.logout));







module.exports = router;