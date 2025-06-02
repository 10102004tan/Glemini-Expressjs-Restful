'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const OTP = require('../models/otp.model');
const crypto = require('crypto');

class OTPService {
  static async generateTokenRandom() {
    const token = await crypto.randomInt(10000, 99999);
    return token;
  }

  static async newOTP(email) {
    // check if email is already used
    const foundToken = await OTP.findOne({ otp_email: email });
    foundToken && (await OTP.deleteOne({ otp_email: email }));
    const token = await this.generateTokenRandom();
    const newToken = await OTP.create({
      otp_token: token,
      otp_email: email,
    });

    if (!newToken) {
      throw new BadRequestError('Cannot create OTP token');
    }

    return newToken;
  }

  static async verifyOTP({ email, otp }) {
    const foundToken = await OTP.findOne({ otp_email: email, otp_token: otp });
    if (!foundToken) {
      throw new BadRequestError('OTP invalid or expired');
    }
    return foundToken;
  }
}

module.exports = OTPService;
