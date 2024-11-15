"use strict";

const express = require("express");
const { asynHandler } = require("../../auths/utils");
const userController = require("../../controllers/user.controller");
const { authentication } = require("../../auths");
const router = express.Router();
const { uploadDisk } = require("../../configs/multer.config");
const notificationController = require("../../controllers/notification.controller");

/* AUTHENTICATION */
router.use(asynHandler(authentication));
/* AUTHENTICATION */
router.post("/profile", asynHandler(userController.profile));
router.put(
  "/profile",
  uploadDisk.single("avatar"),
  asynHandler(userController.updateProfile)
);
router.post(
  "/profile/verification",
  asynHandler(userController.updateFilesTeacher)
);
router.post(
  "/profile/verification/images",
  asynHandler(userController.getImagesVerification)
);
router.post(
  "/profile/verification/re-upload",
  uploadDisk.array("images"),
  asynHandler(userController.updateFilesTeacher)
);
router.post("/notifications", asynHandler(userController.getNotification));
router.post("/share-quiz", asynHandler(userController.shareQuizToTeacher));
router.post(
  "/check-edit-quiz",
  asynHandler(userController.checkPermissionEditQuiz)
);

module.exports = router;
