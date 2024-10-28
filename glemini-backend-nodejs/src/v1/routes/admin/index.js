'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asynHandler } = require('../../auths/utils');
const router = express.Router();

router.post('/user/update-status',asynHandler(accessController.updateStatus));

//TEMPLATE
router.use('/template', require('./template'));
router.use('/notification', require('./notifications'));

module.exports = router;