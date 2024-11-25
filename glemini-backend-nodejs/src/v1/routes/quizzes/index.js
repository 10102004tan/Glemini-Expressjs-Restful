"use strict";
const express = require("express");
const router = express.Router();
const { asynHandler } = require("../../auths/utils");
const quizController = require("../../controllers/quiz.controller");
const {
  uploadQuizzes,
  uploadDocs,
  uploadGenimiRequestImage,
} = require("../../configs/multer.config");
const templateRouter = require("../template");
const { authentication } = require("../../auths");

router.use("/get-templates", templateRouter);
router.post("/search", asynHandler(quizController.search));

// AUTHENTICATION
// router.use(asynHandler(authentication));
// AUTHENTICATION

router.post(
  "/upload",
  uploadQuizzes.single("file"),
  asynHandler(quizController.uploadQuiz)
);

router.post(
  "/docs/upload",
  uploadDocs.single("file"),
  asynHandler(quizController.uploadDoc)
);

router.post(
  "/md/upload",
  uploadDocs.single("file"),
  asynHandler(quizController.uploadMd)
);

router.post(
  "/txt/upload",
  uploadDocs.single("file"),
  asynHandler(quizController.uploadTxt)
);

router.post("/create", asynHandler(quizController.createQuiz));
router.post("/delete", asynHandler(quizController.deleteQuiz));
router.post("/update", asynHandler(quizController.updateQuiz));
router.post("/get-by-user", asynHandler(quizController.getQuizByUser));
router.post("/get-details", asynHandler(quizController.getQuizDetails));
router.post("/get-questions", asynHandler(quizController.getQuestionsByQuiz));
router.post("/filter", asynHandler(quizController.filterQuizzes));
router.post("/banner", asynHandler(quizController.getQuizzesBanner));
router.post(
  "/gemini/generate/prompt",
  asynHandler(quizController.geminiCreateQuestionByPrompt)
);
router.post(
  "/gemini/generate/images",
  uploadGenimiRequestImage.single("file"),
  asynHandler(quizController.geminiCreateQuestionByImages)
);
router.post(
  "/published",
  asynHandler(quizController.getQuizzesBySubjectPublished)
);
router.post(
  "/get-all-quizzes-shared",
  asynHandler(quizController.getAllQuizShared)
);
router.post(
  "/remove-quiz-shared",
  asynHandler(quizController.removeQuizShared)
);
router.post("/copy-quiz", asynHandler(quizController.copyQuiz));
router.post(
  "/get-all-user-shared",
  asynHandler(quizController.getAllSharedUser)
);
router.post("/remove-user-shared", asynHandler(quizController.removeSharedUser));

module.exports = router;
