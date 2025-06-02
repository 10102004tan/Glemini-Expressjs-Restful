'use strict';

const express = require('express');
const emailController = require('../../controllers/email.controller');
const router = express.Router();

router.post('/send-otp', emailController.sendEmailOTP);

module.exports = router;
