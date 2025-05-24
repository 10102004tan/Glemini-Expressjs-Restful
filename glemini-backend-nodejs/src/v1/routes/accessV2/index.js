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
	asynHandler(accessController.signupV2)
);
router.post(
	'/login',
	asynHandler(accessController.loginV2)
);

router.post(
	'/logout',
	asynHandler(authentication),
	asynHandler(accessController.logoutV2)
);

router.get('/me',
	asynHandler(authentication),
	asynHandler(accessController.me)
);

router.post(
	'/teacher/create',
	asynHandler(authentication),
	uploadDisk.array('files'),
	asynHandler(accessController.createTeacher)
);
module.exports = router;
