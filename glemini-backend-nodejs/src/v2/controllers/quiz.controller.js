/**
 * @file quiz.controller.js
 * @description Controller for handling quiz operations such as creating, updating, deleting, and searching quizzes.
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-2
 */
'use strict';

const { OK } = require('@cores/success.response');
const QuizService = require('@v2/services/quiz.service');

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

  async getQuestionsByQuiz(req, res, next) {
    return new OK({
      message: 'Get questions by quiz successfully',
      metadata: await QuizService.getQuestionsByQuiz({
        ...req.params,
      }),
    }).send(res);
  }

  /**
   * create quiz
   */
  async create(req, res, next) {
    return new OK({
      message: 'Create quiz successfully',
      metadata: await QuizService.createQuiz({
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }
}

module.exports = new QuizController();
