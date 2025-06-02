'use strict';

const express = require('express');
const router = express.Router();

router.use('/quizzes', require('./quizzes'));
router.use('/auth', require('./access'));
router.use('/system', require('@v1/routes/system'));

module.exports = router;
