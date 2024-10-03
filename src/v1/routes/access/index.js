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




/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post(
	'/me',
	asynHandler((req, res) => {
		const user = req.user;
		res.json(user);
	})
);
router.post('/logout', asynHandler(accessController.logout));
router.post('/change-password', asynHandler(accessController.changePassword));
router.post('/refresh-token', asynHandler(accessController.refresh));

module.exports = router;
