"use strict";
const { CREATED, OK } = require("../cores/success.response");
const { UserService, TeacherService } = require("../services/user.service");

class UserController {
  newUser = async (req, res) => {};

  checkRegisterEmailToken = async (req, res) => {};

  profile = async (req, res) => {
    return new OK({
      message: "Profile",
      metadata: await UserService.profile(req.user),
    }).send(res);
  };

  updateProfile = async (req, res) => {
    const avatar = req.file ? req.file.path : null;
    return new OK({
      message: "Update Profile",
      metadata: await UserService.updateProfile({
        ...req.body,
        avatar,
        user_id: req.user.user_id,
      }),
    }).send(res);
  };

  // get images verification teacher
  getImagesVerification = async (req, res) => {
    return new OK({
      message: "Get Images Verification",
      metadata: await TeacherService.getImagesVerification({
        user_id: req.user.user_id,
      }),
    }).send(res);
  };

  // update files teacher

  updateFilesTeacher = async (req, res) => {
    return new OK({
      message: "Update Files Teacher",
      metadata: await TeacherService.updateFilesTeacher({
        user_id: req.user.user_id,
        file_urls: req.file.file_urls,
      }),
    }).send(res);
  };

  // Check email exsist
  shareQuizToTeacher = async (req, res) => {
    return new OK({
      message: "OK",
      metadata: await UserService.shareQuizToTeacher(req.body),
    }).send(res);
  };

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
    // checkExsitsEmail = async (req, res) => {
    //      return new OK({
    //            message: "Check Email Exsist",
    //            metadata: await UserService.checkExsitsEmail(req.body)
    //      }).send(res);
    // }


    // get notification
    getNotification = async (req, res) => {
        return new OK({
            message: "Get Notification",
            metadata: await UserService.findNotificationByReceiverId({
                user_id: req.user.user_id,
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res);
    }


    // get all teacher
    getAllTeacher = async (req, res) => {
        return new OK({
            message: "Get All Teacher",
            metadata: await TeacherService.getAllTeachersAccount({
                skip: req.body.skip,
                limit: req.body.limit
            })
        }).send(res);
    }


    // re upload images
    updateFilesTeacher = async (req, res) => {
        return new OK({
            message: "Re Upload Images",
            metadata: await TeacherService.reUploadImages({
                user_id: req.user.user_id,
                files: req.files,
                email: req.user.user_email
            })
        }).send(res);
    }
}

module.exports = new UserController();
