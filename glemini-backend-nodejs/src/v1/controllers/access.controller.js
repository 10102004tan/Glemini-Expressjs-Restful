'use strict';
const {CREATED, OK} = require('../cores/success.response');
const accessService = require('../services/access.service');

class AccessController {
    /**
     * @description This is 
     */

    signup = async (req, res, next) => {
        return new CREATED({
            message: "User created successfully",
            metadata: await accessService.signup({
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type,
                user_expotoken: req.body.expo_push_token,
                attributes: req.body.attributes,
                files: req.files
            })
        }).send(res);
    }

    login = async (req, res, next) => {
        return new OK({
            message: "User LOGIN successfully",
            metadata: await accessService.login({
                email: req.body.email,
                password: req.body.password,
                user_expotoken: req.body.user_push_token
            })
        }).send(res);
    }

    logout = async (req, res, next) => {
        console.log(req.user);
        return new OK({
            message: "User LOGOUT successfully",
            metadata: await accessService.logout({
                user_id:req.user.user_id,
                user_expotoken:req.body.expo_push_token
            })
        }).send(res);
    }

    refresh = async (req, res, next) => {
        return new OK({
            message: "User refresh token successfully",
            metadata: await accessService.refresh({
                user:req.user,
                refreshToken:req.refreshToken
            })
        }).send(res);
    }

    changePassword = async (req, res, next) => {
        return new OK({
            message: "User change password successfully",
            metadata: await accessService.changePassword({
                email:req.user.user_email,
                old_password:req.body.oldPassword,
                new_password:req.body.newPassword
            })
        }).send(res);
    };

    getStatus = async (req, res, next) => {
        console.log(req.user);
        return new OK({
            message: "User status successfully",
            metadata: await accessService.getStatus(req.user)
        }).send(res);
    };

    updateStatus = async(req, res, next) => {
        return new OK({
            message: "User status successfully",
            metadata: await accessService.updateStatus({
                user_id:req.body.user_id,
                user_status:req.body.user_status,
                teacher_status:req.body.teacher_status
            })
        }).send(res);
    }

    forgotPassword = async(req, res, next) => {
        return new OK({
            message: "OTP send successfully",
            metadata: await accessService.forgotPassword({
                email:req.body.email
            })
        }).send(res);
    };

    verifyOtp = async(req, res, next) => {
        return new OK({
            message: "OTP verified successfully",
            metadata: await accessService.verifyOtp({
                email:req.body.email,
                otp:req.body.otp
            })
        }).send(res);
    }

    resetPassword = async(req, res, next) => {
        return new OK({
            message: "Password reset successfully",
            metadata: await accessService.resetPassword({
                email:req.body.email,
                password:req.body.password,
                otp:req.body.otp
            })
        }).send(res);
    };



}

module.exports = new AccessController();