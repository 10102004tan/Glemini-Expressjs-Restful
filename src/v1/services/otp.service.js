'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const OTP = require('../models/otp.model');

class OTPService{
    static async generateTokenRandom(){
        const token  = await crypto.randomInt(0,Math.pow(2,32));
        return token;
    }

    static async newOTP(email){
        const token  = await this.generateTokenRandom();
        const newToken = await OTP.create({
            otp_token: token,
            otp_email: email
        });

        if(!newToken){
            throw new BadRequestError("Cannot create OTP token");
        }

        return newToken;
    }
}

module.exports = OTPService;