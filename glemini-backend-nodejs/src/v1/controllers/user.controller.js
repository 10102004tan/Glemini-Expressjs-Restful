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
        const avatar = req.file ? req.file.path : null;
        return new OK({
            message: "Update Profile",
            metadata: await UserService.updateProfile({
                ...req.body,
                avatar,
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


    // update files teacher

    updateFilesTeacher = async (req, res) => {
        return new OK({
            message: "Update Files Teacher",
            metadata: await TeacherService.updateFilesTeacher({
                user_id: req.user.user_id,
                file_urls: req.file.file_urls
            })
        }).send(res);
    }

    // Check email exsist
    checkExsitsEmail = async (req, res) => {
         return new OK({
               message: "Check Email Exsist",
               metadata: await UserService.checkExsitsEmail(req.body)
         }).send(res);
    }


    // get notification
    getNotification = async (req, res) => {
        return new OK({
            message: "Get Notification",
            metadata: await UserService.findNotificationByReceiverId({
                user_id: req.user.user_id
            })
        }).send(res);
    }
}

module.exports = new UserController();
