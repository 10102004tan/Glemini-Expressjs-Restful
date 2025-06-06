'use strict';
const express = require('express');
const { asynHandler } = require('../../auths/utils');
const notificationController = require('../../controllers/notification.controller');
const { authentication } = require('../../auths');
const router = express.Router();

router.use(asynHandler(authentication));
router.put('/', asynHandler(notificationController.updateStatusNotification));
router.post('/read-all', asynHandler(notificationController.readAll));

module.exports = router;
