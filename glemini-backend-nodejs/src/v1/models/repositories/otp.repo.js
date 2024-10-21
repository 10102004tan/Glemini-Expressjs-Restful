'use strict';

const otpModel = require("../otp.model");

const removeOTPbyEmail = async (email) => {
    return await otpModel.deleteOne({ otp_email: email });
};

module.exports = {
    removeOTPbyEmail
};