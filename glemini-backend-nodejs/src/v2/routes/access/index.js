'use strict';
const express = require('express');
const router = express.Router();
const { asynHandler } = require('@v1/auths/utils');
const accessController = require('@v2/controllers/access.controller');
const { authentication } = require('@v1/auths');
const { uploadDisk } = require('@v1/configs/multer.config');

router.post('/signup', asynHandler(accessController.signup));
router.post('/login', asynHandler(accessController.login));
router.post(
  '/refresh-token',
  asynHandler(authentication),
  asynHandler(accessController.refreshToken),
);

router.post('/logout', asynHandler(authentication), asynHandler(accessController.logout));

router.get('/me', asynHandler(authentication), asynHandler(accessController.me));

router.post(
  '/teacher/create',
  asynHandler(authentication),
  uploadDisk.array('files'),
  asynHandler(accessController.createTeacher),
);

router.put(
  '/teacher/confirm',
  asynHandler(authentication),
  // grantAccess("readAny","admin"),
  asynHandler(accessController.updateRoleForUser),
);
module.exports = router;
