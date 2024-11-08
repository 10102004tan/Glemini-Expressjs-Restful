'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const roomController = require('../../controllers/room.controller');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.post('/create', asynHandler(roomController.createRoom));
router.post('/report', asynHandler(roomController.detailRoom));


module.exports = router;
