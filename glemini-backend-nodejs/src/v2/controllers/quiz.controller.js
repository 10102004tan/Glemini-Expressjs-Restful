/**
 * @file quiz.controller.js
 * @description Controller for handling quiz operations such as creating, updating, deleting, and searching quizzes.
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-2
 */
'use strict';

const { OK } = require('../../v1/cores/success.response');
const QuizService = require('../services/quiz.service');

class QuizController {
  async search(req, res, next) {
    const newBody = {
      ...req.body,
      ...req.user,
    };
    return new OK({
      message: 'Search successfully',
      metadata: await QuizService.search(newBody),
    }).send(res);
  }
}

module.exports = new QuizController();
