'use strict';
const { CREATED, OK } = require('../cores/success.response');
const { UserService, TeacherService } = require('../services/user.service');

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

    // get images verification teacher
    getImagesVerification = async (req, res) => {
        return new OK({
            message: "Get Images Verification",
            metadata: await TeacherService.getImagesVerification({
                user_id: req.user.user_id
            })
        }).send(res);
    }


}

module.exports = new UserController();
