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
router.post('/list', asynHandler(roomController.getListCreatedRoom));
router.post('/detail', asynHandler(roomController.getRoomDetail));
router.post('/update', asynHandler(roomController.updateRoom));
router.post('/report', asynHandler(roomController.detailRoom));
router.post('/add-user', asynHandler(roomController.addUserToRoom));
router.post('/remove-user', asynHandler(roomController.removeUserFromRoom));
router.post('/check-joined', asynHandler(roomController.checkJoinedUser));
module.exports = router;
