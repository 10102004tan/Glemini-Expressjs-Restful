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

  /**
   * create question
   */
  async createQuestion(req, res, next) {
    return new OK({
      message: 'Create question successfully',
      metadata: await QuizService.createQuestion({
        ...req.body,
        ...req.user,
      })
    }).send(res);
  }

  /**
   * create answer
   */
  async createAnswer(req, res, next) {
    return new OK({
      message: 'Create answer successfully',
      metadata: await QuizService.createAnswer({
        ...req.body,
        ...req.user,
      })
    }).send(res);
  }

  /**
   * check correct answer
   */
  async checkCorrectAnswer(req, res, next) {
    return new OK({
      message: 'Check correct answer successfully',
      metadata: await QuizService.checkCorrectAnswer({
        ...req.body,
      })
    }).send(res);
  }
}

module.exports = new QuizController();
