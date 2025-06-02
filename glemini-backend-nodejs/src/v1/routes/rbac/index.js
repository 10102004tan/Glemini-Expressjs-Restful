'use strict';
const express = require('express');
const router = express.Router();

const rbacController = require('../../controllers/rbac.controller');
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.post('/role/create', asynHandler(rbacController.createRole));
router.post('/resource/create', asynHandler(rbacController.createResource));

module.exports = router;
