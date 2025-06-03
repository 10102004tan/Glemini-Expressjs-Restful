'use strict';

const express = require('express');
const { asynHandler } = require('../../../auths/utils');
const notificationController = require('../../../controllers/notification.controller');

const router = express.Router();
// PUSH FOR ::
router.post('/send', asynHandler(notificationController.sendNotificationAdmin));
module.exports = router;
