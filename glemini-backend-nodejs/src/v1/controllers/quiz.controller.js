'use strict';
const { CREATED, OK } = require('../cores/success.response');
const quizService = require('../services/quiz.service');

class QuizController {
  createQuiz = async (req, res) => {
    return new CREATED({
      message: 'Quiz created successfully',
      metadata: await quizService.createQuiz(req.body),
    }).send(res);
  };

  // lấy tất cả các quiz theo người dùng
  getQuizByUser = async (req, res) => {
    return new OK({
      message: 'Quiz fetched successfully',
      metadata: await quizService.getQuizByUser(req.body),
    }).send(res);
  };

  getQuizDetails = async (req, res) => {
    return new OK({
      message: 'Quiz fetched successfully',
      metadata: await quizService.getQuizDetails(req.body),
    }).send(res);
  };

  getQuestionsByQuiz = async (req, res) => {
    return new OK({
      message: 'Questions fetched successfully',
      metadata: await quizService.getQuestionsByQuiz(req.body),
    }).send(res);
  };

  getQuizzesBySubjectPublished = async (req, res) => {
    return new OK({
      message: 'Quizzes fetched successfully',
      metadata: await quizService.getQuizzesBySubjectIdPublished(req.body),
    }).send(res);
  };

  getQuizzesBanner = async (req, res) => {
    return new OK({
      message: 'Quizzes fetched successfully',
      metadata: await quizService.getQuizzesBanner(),
    }).send(res);
  };

  search = async (req, res) => {
    return new OK({
      message: 'Search successfully',
      metadata: await quizService.search(req.body),
    }).send(res);
  };

  getQuizzesBanner = async (req, res) => {
    return new OK({
      message: 'Quizzes fetched successfully',
      metadata: await quizService.getQuizzesBanner(),
    }).send(res);
  };

  search = async (req, res) => {
    return new OK({
      message: 'Search successfully',
      metadata: await quizService.search(req.body),
    }).send(res);
  };

  deleteQuiz = async (req, res) => {
    return new OK({
      message: 'Quiz deleted successfully',
      metadata: await quizService.deleteQuiz(req.body),
    }).send(res);
  };

  updateQuiz = async (req, res) => {
    return new OK({
      message: 'Quiz updated successfully',
      metadata: await quizService.updateQuiz(req.body),
    }).send(res);
  };

  uploadQuiz = async (req, res) => {
    return new OK({
      message: 'Quiz uploaded successfully',
      metadata: await quizService.uploadQuiz(req, res),
    }).send(res);
  };

  uploadDoc = async (req, res) => {
    return new OK({
      message: 'Document uploaded successfully',
      metadata: await quizService.uploadDoc(req, res),
    }).send(res);
  };

  uploadMd = async (req, res) => {
    return new OK({
      message: 'Document uploaded successfully',
      metadata: await quizService.uploadMd(req, res),
    }).send(res);
  };

  uploadTxt = async (req, res) => {
    return new OK({
      message: 'Text file uploaded successfully',
      metadata: await quizService.uploadTxt(req, res),
    }).send(res);
  };

  getDocsTemplate = async (req, res) => {
    return new OK({
      message: 'Docs fetched successfully',
      metadata: await quizService.getDocsTemplate(req, res),
    }).send(res);
  };

  filterQuizzes = async (req, res) => {
    return new OK({
      message: 'Quizzes fetched successfully',
      metadata: await quizService.filterQuizzes(req.body),
    }).send(res);
  };

  geminiCreateQuestionByPrompt = async (req, res) => {
    return new OK({
      message: 'Question created successfully',
      metadata: await quizService.geminiCreateQuestionByPrompt(req.body),
    }).send(res);
  };

  geminiCreateQuestionByImages = async (req, res) => {
    return new OK({
      message: 'Question created successfully',
      metadata: await quizService.geminiCreateQuestionByImages(req),
    }).send(res);
  };

  getAllQuizShared = async (req, res) => {
    return new OK({
      message: 'Quizzes fetched successfully',
      metadata: await quizService.getAllQuizShared(req.body),
    }).send(res);
  };

  removeQuizShared = async (req, res) => {
    return new OK({
      message: 'Quiz removed successfully',
      metadata: await quizService.removeQuizShared(req.body),
    }).send(res);
  };
  // sao chép tất cả quiz của người dùng khác
  copyQuiz = async (req, res) => {
    return new OK({
      message: 'Quiz copied successfully',
      metadata: await quizService.copyQuizShared(req.body),
    }).send(res);
  };

  //lấy tất cả thông tin user đã chia sẻ
  getAllSharedUser = async (req, res) => {
    return new OK({
      message: 'Get user successfully',
      metadata: await quizService.getSharedUserIds(req.body),
    }).send(res);
  };

  // Xóa object trong mảng shared_user_ids dựa trên user_id.user_email
  removeSharedUser = async (req, res) => {
    return new OK({
      message: 'Remove user successfully',
      metadata: await quizService.removeSharedUser(req.body),
    }).send(res);
  };

  // Lấy 5 quiz mới nhất
  getNewestQuizzes = async (req, res) => {
    return new OK({
      message: 'Get newest quiz successfully',
      metadata: await quizService.getNewestQuizzes(req.body),
    }).send(res);
  };

  /**
   * Duplicate quiz
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  duplicateQuiz = async (req, res) => {
    return new CREATED({
      message: 'Quiz duplicated successfully',
      metadata: await quizService.duplicateQuiz({
        ...req.body,
        user_id: req.user.user_id,
      }),
    }).send(res);
  };
}

module.exports = new QuizController();
