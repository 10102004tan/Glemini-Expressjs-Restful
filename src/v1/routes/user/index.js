'use strict';

const express = require('express');
const { asynHandler } = require('../../auths/utils');
const userController = require('../../controllers/user.controller');
const { authentication } = require('../../auths');
const router = express.Router();
const { uploadDisk } = require('../../configs/multer.config');

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.post('/profile', asynHandler(userController.profile));
router.put('/profile',uploadDisk.fields("user_avatar"), asynHandler(userController.updateProfile));
router.post('/profile/verification/images', asynHandler(userController.getImagesVerification));

module.exports = router;