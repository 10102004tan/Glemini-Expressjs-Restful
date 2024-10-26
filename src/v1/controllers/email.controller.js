"use strict";
const { OK } = require("../cores/success.response");
const EmailService = require("../services/email.service");

class EmailController {
  sendEmailOTP = async (req, res, next) => {
    return new OK({
      message: "Send email OTP success",
      metadata: await EmailService.sendEmailOTP({ email: req.body.email }),
    }).send(res);
  };

    // sendQuizToTeacherByEmail = async (req, res, next) => {
    //   return new OK({
    //     message: "Send quiz to teacher success",
    //     metadata: await EmailService.sendQuizToTeacherByEmail({
    //       email: req.body.email,
    //       quiz: req.body.quiz,
    //     }),
    //   }).send(res);
    // };
}

module.exports = new EmailController();
