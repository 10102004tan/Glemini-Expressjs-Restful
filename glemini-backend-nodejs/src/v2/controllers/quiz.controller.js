/**
 * @file quiz.controller.js
 * @description Controller for handling quiz operations such as creating, updating, deleting, and searching quizzes.
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-2
 */
'use strict';

const { OK, CREATED } = require('@cores/success.response');
const QuizService = require('@v2/services/quiz.service');

class QuizController {
  /**
   * Get quizzes by user with pagination
   */
  async getQuizzesByUser(req, res, next) {
    return new OK({
      message: 'Get quizzes successfully',
      metadata: await QuizService.getQuizzesByUser({
        user_id: req.query.user_id,
        skip: req.query.skip || 0,
        limit: req.query.limit || 10,
      }),
    }).send(res);
  }

  async search(req, res, next) {
    const newBody = {
      ...req.body,
      ...req.user,
    };
    console.log('newBody', newBody);
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
   * get quiz details
   */
  async getDetails(req, res, next) {
    return new OK({
      message: 'Get quiz successfully',
      metadata: await QuizService.getQuizDetails({
        quizId: req.params.quizId,
      }),
    }).send(res);
  }

  /**
   * get question details
   */
  async getQuestionDetails(req, res, next) {
    return new OK({
      message: 'Get question successfully',
      metadata: await QuizService.getQuestionDetails({
        questionId: req.params.questionId,
      }),
    }).send(res);
  }

  /**
   * create quiz
   */
  async create(req, res, next) {
    return new CREATED({
      message: 'Create quiz successfully',
      metadata: await QuizService.createQuiz({
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * update quiz
   */
  async update(req, res, next) {
    return new OK({
      message: 'Update quiz successfully',
      metadata: await QuizService.updateQuiz({
        quizId: req.params.quizId,
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * delete quiz
   */
  async delete(req, res, next) {
    return new OK({
      message: 'Delete quiz successfully',
      metadata: await QuizService.deleteQuiz({
        quizId: req.params.quizId,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * duplicate quiz
   */
  async duplicate(req, res, next) {
    return new CREATED({
      message: 'Duplicate quiz successfully',
      metadata: await QuizService.duplicateQuiz({
        quizId: req.params.quizId,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * create question
   */
  async createQuestion(req, res, next) {
    return new CREATED({
      message: 'Create question successfully',
      metadata: await QuizService.createQuestion({
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * create question with V1 structure (temporary compatibility)
   */
  async createQuestionV1(req, res, next) {
    return new CREATED({
      message: 'Create question successfully',
      metadata: await QuizService.createQuestionV1({
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * update question with V1 structure (temporary compatibility)
   */
  async updateQuestionV1(req, res, next) {
    return new OK({
      message: 'Update question successfully',
      metadata: await QuizService.updateQuestionV1({
        questionId: req.params.questionId,
        ...req.body,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * delete question
   */
  async deleteQuestionV1(req, res, next) {
    return new OK({
      message: 'Delete question successfully',
      metadata: await QuizService.deleteQuestionV1({
        questionId: req.params.questionId,
        ...req.user,
      }),
    }).send(res);
  }

  /**
   * create answer
   */
  async createAnswer(req, res, next) {
    return new CREATED({
      message: 'Create answer successfully',
      metadata: await QuizService.createAnswer({
        ...req.body,
        ...req.user,
      }),
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
      }),
    }).send(res);
  }

  async getKeySearchRecent(req, res, next) {
    const { user_id } = req.user;
    return new OK({
      message: 'Get key search recent successfully',
      metadata: await QuizService.getKeySearchRecent(user_id),
    }).send(res);
  }

  async clearKeySearchRecent(req, res, next) {
    const { user_id } = req.user;
    return new OK({
      message: 'Clear key search recent successfully',
      metadata: await QuizService.clearKeySearchRecent(user_id),
    }).send(res);
  }
}

module.exports = new QuizController();
