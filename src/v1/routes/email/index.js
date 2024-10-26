"use strict";

const express = require("express");
const emailController = require("../../controllers/email.controller");
const router = express.Router();

router.post("/send-otp", emailController.sendEmailOTP);
// router.post('/send-quiz-to-teacher', emailController.sendQuizToTeacherByEmail);

module.exports = router;
