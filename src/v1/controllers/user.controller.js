'use strict';
const { CREATED, OK } = require('../cores/success.response');
const { UserService } = require('../services/user.service');

class UserController {
    
    newUser = async (req, res) => {

    }

    checkRegisterEmailToken = async (req, res) => {
        
    }


    profile = async (req, res) => {
        return new OK({
            message: "Profile",
            metadata: await UserService.profile(req.user)
        }).send(res);
    }

    updateProfile = async (req, res) => {

        return new OK({
            message: "Update Profile",
            metadata: await UserService.updateProfile({
                ...req.body,
                user_id: req.user.user_id
            })
        }).send(res);
    }


}

module.exports = new UserController();
