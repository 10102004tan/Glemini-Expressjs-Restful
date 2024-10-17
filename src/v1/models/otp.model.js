'use strict';

const {model,Schema} = require('mongoose');

const otpSchema = new Schema({
    otp_token:{
        type:String,
        required:true
    },
    otp_email:{
        type:String,
        required:true
    },
    opt_status:{
        type:String,
        enum:['pending','verified','expired'],
        default:'pending'
    },
    expireAdt:{
        type:Date,
        default:Date.now,
        expires:180 // 3 minutes
    }
},{timestamps:true});

module.exports = model('OTP_log',otpSchema);