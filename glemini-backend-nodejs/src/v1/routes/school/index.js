'use strict';
const express = require('express');
const router = express.Router();
const { authentication } = require('../../auths');
const { asynHandler } = require('../../auths/utils');
const schoolController = require('../../controllers/school.controller');

/* AUTHENTICATION */
// router.use(asynHandler(authentication));
/* AUTHENTICATION */

router.post('', schoolController.getAllSchools);
router.post('/filter', schoolController.filter);

module.exports = router;
