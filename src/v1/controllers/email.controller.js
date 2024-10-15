'use strict';
const {OK} = require("../cores/success.response");
const EmailService = require("../services/email.service");

class EmailController {

    sendEmailOTP = async(req,res,next)=>{
        return new OK({
            message: "Send email OTP success",
            metadata:await EmailService.sendEmailOTP({email:req.body.email}),
        }).send(res);
    }
}

module.exports = new EmailController();