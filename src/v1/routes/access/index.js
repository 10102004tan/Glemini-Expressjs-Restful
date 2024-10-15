'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('../../auths/utils');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../auths');
const { uploadDisk } = require('../../configs/multer.config');
const path = require('path');

router.post(
	'/signup',
	uploadDisk.array('images'),
	asynHandler(accessController.signup)
);
router.post('/login', asynHandler(accessController.login));
router.post('/forgot-password', asynHandler(accessController.forgotPassword));
router.post('/verify-otp', asynHandler(accessController.verifyOtp));
router.post('/reset-password', asynHandler(accessController.resetPassword));

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('/logout', asynHandler(accessController.logout));
router.post('/change-password', asynHandler(accessController.changePassword));
router.post('/refresh-token', asynHandler(accessController.refresh));
router.post('/status', asynHandler(accessController.getStatus));
router.post('/teacher-status', asynHandler(accessController.getStatus));

module.exports = router;
