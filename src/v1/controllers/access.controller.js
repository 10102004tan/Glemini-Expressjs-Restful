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
                attributes: req.body.attributes,
                files: req.files
            })
        }).send(res);
    }

    login = async (req, res, next) => {
        return new OK({
            message: "User LOGIN successfully",
            metadata: await accessService.login(req.body)
        }).send(res);
    }

    logout = async (req, res, next) => {
        return new OK({
            message: "User LOGOUT successfully",
            metadata: await accessService.logout(req.user)
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
}

module.exports = new AccessController();