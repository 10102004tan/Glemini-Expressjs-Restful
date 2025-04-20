'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asynHandler } = require('../../auths/utils');
const { grantAccess } = require('../../middlewares/rbac');
const { authentication } = require('../../auths');
const router = express.Router();

router.use(asynHandler(authentication));
router.post('/user/update-status',asynHandler(accessController.updateStatus));
router.use('/template', require('./template'));
router.use('/notification', require('./notifications'));
router.use('/user',grantAccess("readAny","user"), require('./user'));

module.exports = router;