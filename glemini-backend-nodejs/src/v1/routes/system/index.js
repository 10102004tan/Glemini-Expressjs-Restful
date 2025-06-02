'use strict';

const express = require('express');
const { asynHandler } = require('../../auths/utils');
const { authentication } = require('../../auths');
const router = express.Router();
const { checkAuth } = require('../../controllers/_system.controller');

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.get('/checkAuth', asynHandler(checkAuth));
module.exports = router;
