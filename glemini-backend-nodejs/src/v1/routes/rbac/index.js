"use strict";
const express = require('express');
const router = express.Router();

const resourceController = require('../../controllers/rbac.controller');
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.post('/role/create', asynHandler(resourceController.createRole));
router.post('/resource/create', asynHandler(resourceController.createResource));

module.exports = router;