/**
 * @version 2.0
 * @since 2025-6-2
 * @description QuizService provides methods to search quizzes based on various criteria.
 * @author 10102004tan
 * @module services/quiz.service
 */
'use strict';

const quizModel = require('../../v1/models/quiz.model');
const {
  Types: { ObjectId },
} = require('mongoose');

class QuizService {
  /**
   * Search quizzes based on the provided criteria.
   * @param {*} param0
   * @returns
   */
  static async search({ key, page = 1, limit = 20, sortStatus = 1, quiz_on = -1, subjectIds }) {
    const query = {};
    if (key) {
      query.quiz_name = { $regex: key, $options: 'i' };
    }

    // get quiz published
    query.quiz_status = 'published';

    // get quiz by subject : quiz.subject_ids = [1,2,3,4] ; subjectIds = [1,2]
    if (subjectIds && subjectIds.length > 0) {
      subjectIds = subjectIds.map((subjectId) => ObjectId.createFromHexString(subjectId));
      query.subject_ids = { $in: subjectIds };
    }

    if (quiz_on !== -1) {
      query.quiz_turn = { $gte: quiz_on };
    }
    const result = {
      items: [],
      totalPage: 0,
      totalItems: 0,
    };
    // Calculate skip from page and limit
    const skip = (page - 1) * limit;
    const quizzes = await quizModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'quiz_id',
          as: 'questions',
        },
      },
      {
        // lookup with user and unwind
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          quiz_name: 1,
          quiz_description: 1,
          quiz_thumb: 1,
          user_id: 1,
          quiz_turn: 1,
          quiz_status: 1,
          createdAt: 1,
          subject_ids: 1,
          user_avatar: '$user.user_avatar',
          user_fullname: '$user.user_fullname',
          question_count: { $size: '$questions' }, // Count of questions
        },
      },
      {
        $match: { question_count: { $gt: 0 } },
      },
      { $sort: { createdAt: sortStatus } },
      { $skip: skip },
      { $limit: limit },
    ]);

    result.items = quizzes;
    result.totalItems = await quizModel.countDocuments(query);
    result.totalPage = Math.ceil(result.totalItems / limit);
    return result;
  }
}

module.exports = QuizService;
