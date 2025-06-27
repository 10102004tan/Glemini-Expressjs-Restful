/**
 * @version 2.0
 * @since 2025-6-2
 * @description QuizService provides methods to search quizzes based on various criteria.
 * @author 10102004tan
 * @module services/quiz.service
 */
'use strict';

const questionModel = require('@v1/models/question.model');
const quizModel = require('@v1/models/quiz.model');
const {
  Types: { ObjectId },
} = require('mongoose');
const { subjectsIsExit } = require('@v1/models/repositories/subject.repo');
const { BadRequestError } = require('@v1/cores/error.repsone');
const { answersIsExit } = require('@v1/models/repositories/answer.repo');
const answerModel = require('@v1/models/answer.model');
const { sortRandomArray } = require('../util');

class QuizService {
  /**
   * Get quizzes by user ID with pagination
   * @param {Object} param0 - Parameters
   * @param {string} param0.user_id - User ID
   * @param {number} param0.skip - Number of items to skip
   * @param {number} param0.limit - Number of items to return
   * @returns {Promise<Array>} - Array of quizzes
   */
  static async getQuizzesByUser({ user_id, skip = 0, limit = 10 }) {
    console.log(
      '🔍 Backend V2 - Getting quizzes for user:',
      user_id,
      'skip:',
      skip,
      'limit:',
      limit,
    );

    const userId = ObjectId.createFromHexString(user_id);

    const quizzes = await quizModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ user_id: userId }, { 'shared_user_ids.user_id': userId }],
            },
            {
              quiz_status: { $ne: 'deleted' }, // Exclude deleted quizzes
            },
          ],
        },
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
          updatedAt: 1,
          subject_ids: 1,
          shared_user_ids: 1,
          user: {
            user_avatar: '$user.user_avatar',
            user_fullname: '$user.user_fullname',
            user_id: '$user._id',
          },
          total_questions: { $size: '$questions' },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
    ]);

    console.log('📊 Backend V2 - Found quizzes:', quizzes.length);
    return quizzes;
  }

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

  /**
   * Get questions by quiz ID.
   * @param {ObjectId} quizId - The ID of the quiz.
   * @returns {Promise<Array>} - An array of questions associated with the quiz.
   */
  static async getQuestionsByQuiz({ quizId }) {
    /**
     * V2 Structure:
     * {
      id: 1,
      question: 'What is the capital of France?',
      options: [
        {
          id: 1,
          text: 'Paris',
          image: 'https://...',
          correct: true
        },
        {
          id: 2,
          text: 'London',
          image: 'https://...',
          correct: false
        }
      ],
      type: 'single',
      point: 1,
      time: 30,
      explanation: 'Paris is the capital...'
    }
     */
    const result = {
      items: [],
      totalPage: 0,
      totalItems: 0,
    };

    console.log('🔍 Backend - Getting questions for quiz:', quizId);

    const questions = await questionModel
      .find({ quiz_id: quizId })
      .populate('question_answer_ids')
      .populate('correct_answer_ids')
      .exec();

    console.log('📊 Backend - Found questions:', questions.length);
    if (questions.length > 0) {
      console.log('🎯 Backend - First question raw:', JSON.stringify(questions[0], null, 2));
    }

    result.totalItems = questions.length;
    result.totalPage = Math.ceil(result.totalItems / 20);

    // Return V2 structure
    const v2Questions = questions.map((question, index) => {
      console.log(`🔄 Backend - Processing question ${index + 1}:`, {
        id: question._id,
        excerpt: question.question_excerpt,
        type: question.question_type,
        answersCount: question.question_answer_ids?.length || 0,
        correctAnswersCount: question.correct_answer_ids?.length || 0,
      });

      const v2Question = {
        id: question._id,
        question: question.question_excerpt || '',
        description: question.question_description || '',
        audio: question.question_audio || '',
        image: question.question_image || '',
        video: question.question_video || '',
        point: question.question_point || 1,
        time: question.question_time || 30,
        explanation: question.question_explanation || '',
        type: question.question_type || 'single',
        options: (question.question_answer_ids || []).map((answer) => ({
          id: answer._id,
          text: answer.text || '',
          image: answer.image || '',
          correct: question.correct_answer_ids.some(
            (correctAnswer) => correctAnswer._id.toString() === answer._id.toString(),
          ),
          attributes: answer.attributes || {},
        })),
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };

      console.log(`✅ Backend - V2 Question ${index + 1}:`, JSON.stringify(v2Question, null, 2));
      return v2Question;
    });

    result.items = v2Questions;

    console.log('🎯 Backend - Final result structure:', {
      totalItems: result.totalItems,
      totalPage: result.totalPage,
      itemsCount: result.items.length,
      firstItem: result.items[0]
        ? {
            id: result.items[0].id,
            question: result.items[0].question?.substring(0, 50) + '...',
            type: result.items[0].type,
            optionsCount: result.items[0].options?.length,
          }
        : null,
    });

    return result;
  }

  /**
   * create quiz
   * @param {Object} quizData - The data for the quiz to be created.
   * @returns {Promise<Object>} - The created quiz object.
   */

  static async createQuiz({ name, user_id, description, status, thumb, subject_ids = [] }) {
    const isSubjectsExist = await subjectsIsExit(subject_ids);
    if (!isSubjectsExist) {
      throw new Error('subject invalid');
    }

    const quizStore = await quizModel.create({
      quiz_name: name,
      user_id,
      quiz_description: description,
      quiz_status: status,
      quiz_thumb: thumb,
      subject_ids: subject_ids.map((subjectId) => ObjectId.createFromHexString(subjectId)),
    });

    return quizStore;
  }

  /**
   * create question for quiz
   * @param {Object} questionData - The data for the question to be created.
   * @returns {Promise<Object>} - The created question object.
   */
  static async createQuestion({
    quizId,
    excerpt,
    description = '',
    audio = '',
    image = '',
    video = '',
    point = 1,
    time = 30,
    explanation = '',
    type = 'single',
    answerIds = [],
    correctAnswerIds = [],
  }) {
    const quizFound = await quizModel.findById(quizId);

    if (!quizFound) {
      throw new BadRequestError('quiz not found!!!');
    }

    const isAnswerExit = await answersIsExit(answerIds);
    if (!isAnswerExit) {
      throw new BadRequestError('answer invalid!!!');
    }

    const isCorrectAnswerExit = await answersIsExit(correctAnswerIds);

    if (!isCorrectAnswerExit) {
      throw new BadRequestError('answer invalid!!!');
    }

    if (type === 'match') {
      if (answerIds.length < 2) {
        throw new BadRequestError('match question must have at least 2 answers');
      }
      if (correctAnswerIds.length !== answerIds.length) {
        throw new BadRequestError(
          'match question must have the same number of correct answers as answers',
        );
      }
    }

    const questionStore = await questionModel.create({
      quiz_id: quizId,
      question_excerpt: excerpt,
      question_description: description,
      question_audio: audio,
      question_image: image,
      question_video: video,
      question_point: point,
      question_time: time,
      question_explanation: explanation,
      question_type: type,
      question_answer_ids: answerIds.map((answerId) => ObjectId.createFromHexString(answerId)),
      correct_answer_ids: correctAnswerIds.map((answerId) =>
        ObjectId.createFromHexString(answerId),
      ),
    });
    return questionStore;
  }

  /**
   * create question with V1 structure (temporary compatibility)
   * @param {Object} questionData - The V1 structure question data
   * @returns {Promise<Object>} - The created question object
   */
  static async createQuestionV1({
    quiz_id,
    question_excerpt,
    question_description = '',
    question_audio = '',
    question_image = '',
    question_video = '',
    question_point = 1,
    question_time = 30,
    question_explanation = '',
    question_type = 'single',
    question_answer_ids = [],
    user_id,
  }) {
    // Validate quiz_id
    if (!quiz_id || quiz_id === 'null' || quiz_id === null) {
      throw new BadRequestError('Quiz ID is required and cannot be null');
    }

    // Validate quiz exists
    const quizFound = await quizModel.findById(quiz_id);
    if (!quizFound) {
      throw new BadRequestError('Quiz not found');
    }

    // Check permission
    const hasPermission =
      quizFound.user_id.toString() === user_id ||
      quizFound.shared_user_ids.some(
        (shared) => shared.user_id.toString() === user_id && shared.isEdit,
      );

    if (!hasPermission) {
      throw new BadRequestError("You don't have permission to add questions to this quiz");
    }

    // Create answers first
    const createdAnswers = [];
    const correctAnswerIds = [];

    for (const answer of question_answer_ids) {
      console.log('🔍 V2 createQuestionV1 - Processing answer:', JSON.stringify(answer, null, 2));

      // Handle different answer formats
      if (answer.items && Array.isArray(answer.items)) {
        // V2 format: Match questions with items array
        console.log('📋 Processing V2 match question with items');

        for (let i = 0; i < answer.items.length; i += 2) {
          const leftItem = answer.items[i];
          const rightItem = answer.items[i + 1];

          if (leftItem && rightItem) {
            const attributes = {
              match: rightItem.text || '',
              pair_index: Math.floor(i / 2),
            };

            const createdAnswer = await answerModel.create({
              text: leftItem.text || '',
              image: answer.image || '',
              attributes: attributes,
            });
            createdAnswers.push(createdAnswer);

            // For match questions, all answers are typically correct
            if (question_type === 'match') {
              correctAnswerIds.push(createdAnswer._id);
            }
          }
        }
      } else {
        // V1 format: Traditional answer with text field
        if (!answer.text) {
          console.error('❌ V2 createQuestionV1 - Answer missing text field:', answer);
          throw new BadRequestError('Answer text is required.');
        }

        // Build attributes for special question types
        const attributes = {};
        if (answer.matchPair) {
          attributes.match = answer.matchPair;
        }
        if (answer.position) {
          attributes.position = answer.position;
        }

        const createdAnswer = await answerModel.create({
          text: answer.text,
          image: answer.image || '',
          attributes: attributes,
        });
        createdAnswers.push(createdAnswer);

        // Track correct answers
        if (answer.correct) {
          correctAnswerIds.push(createdAnswer._id);
        }
      }
    }

    // Create question
    const questionStore = await questionModel.create({
      quiz_id: quiz_id,
      question_excerpt: question_excerpt,
      question_description: question_description,
      question_audio: question_audio,
      question_image: question_image,
      question_video: question_video,
      question_point: question_point,
      question_time: question_time,
      question_explanation: question_explanation,
      question_type: question_type,
      question_answer_ids: createdAnswers.map((answer) => answer._id),
      correct_answer_ids: correctAnswerIds,
    });

    // Populate the question with answers
    const populatedQuestion = await questionModel
      .findById(questionStore._id)
      .populate('question_answer_ids')
      .populate('correct_answer_ids')
      .exec();

    return populatedQuestion;
  }

  /**
   * update question with V1 structure (temporary compatibility)
   * @param {Object} questionData - The V1 structure question data
   * @returns {Promise<Object>} - The updated question object
   */
  static async updateQuestionV1({
    questionId,
    quiz_id,
    question_excerpt,
    question_description = '',
    question_audio = '',
    question_image = '',
    question_video = '',
    question_point = 1,
    question_time = 30,
    question_explanation = '',
    question_type = 'single',
    question_answer_ids = [],
    user_id,
  }) {
    // Find existing question
    const existingQuestion = await questionModel.findById(questionId);
    if (!existingQuestion) {
      throw new BadRequestError('Question not found');
    }

    // Use quiz_id from existing question if not provided or invalid in request body
    const actualQuizId =
      quiz_id && quiz_id !== 'null' && quiz_id !== null ? quiz_id : existingQuestion.quiz_id;

    // Validate quiz exists and check permission
    console.log(
      '🔍 Backend - Looking for quiz with ID:',
      actualQuizId,
      'Type:',
      typeof actualQuizId,
    );
    const quizFound = await quizModel.findById(actualQuizId);
    console.log('🔍 Backend - Quiz found:', !!quizFound);
    if (!quizFound) {
      console.log('❌ Backend - Quiz not found with ID:', actualQuizId);
      throw new BadRequestError('Quiz not found');
    }
    console.log('✅ Backend - Quiz found:', quizFound._id);

    const hasPermission =
      quizFound.user_id.toString() === user_id ||
      quizFound.shared_user_ids.some(
        (shared) => shared.user_id.toString() === user_id && shared.isEdit,
      );

    if (!hasPermission) {
      throw new BadRequestError("You don't have permission to update this question");
    }

    // Delete old answers
    if (existingQuestion.question_answer_ids.length > 0) {
      await answerModel.deleteMany({ _id: { $in: existingQuestion.question_answer_ids } });
    }

    // Create new answers
    const createdAnswers = [];
    const correctAnswerIds = [];

    for (const answer of question_answer_ids) {
      console.log('🔍 V2 updateQuestionV1 - Processing answer:', JSON.stringify(answer, null, 2));

      // Handle different answer formats
      if (answer.items && Array.isArray(answer.items)) {
        // V2 format: Match questions with items array
        console.log('📋 Processing V2 match question with items');

        for (let i = 0; i < answer.items.length; i += 2) {
          const leftItem = answer.items[i];
          const rightItem = answer.items[i + 1];

          if (leftItem && rightItem) {
            const attributes = {
              match: rightItem.text || '',
              pair_index: Math.floor(i / 2),
            };

            const createdAnswer = await answerModel.create({
              text: leftItem.text || '',
              image: answer.image || '',
              attributes: attributes,
            });
            createdAnswers.push(createdAnswer);

            // For match questions, all answers are typically correct
            if (question_type === 'match') {
              correctAnswerIds.push(createdAnswer._id);
            }
          }
        }
      } else {
        // V1 format: Traditional answer with text field
        if (!answer.text) {
          console.error('❌ V2 updateQuestionV1 - Answer missing text field:', answer);
          throw new BadRequestError('Answer text is required.');
        }

        // Build attributes for special question types
        const attributes = {};
        if (answer.matchPair) {
          attributes.match = answer.matchPair;
        }
        if (answer.position) {
          attributes.position = answer.position;
        }

        const createdAnswer = await answerModel.create({
          text: answer.text,
          image: answer.image || '',
          attributes: attributes,
        });
        createdAnswers.push(createdAnswer);

        // Track correct answers
        if (answer.correct) {
          correctAnswerIds.push(createdAnswer._id);
        }
      }
    }

    // Update question
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      questionId,
      {
        question_excerpt: question_excerpt,
        question_description: question_description,
        question_audio: question_audio,
        question_image: question_image,
        question_video: question_video,
        question_point: question_point,
        question_time: question_time,
        question_explanation: question_explanation,
        question_type: question_type,
        question_answer_ids: createdAnswers.map((answer) => answer._id),
        correct_answer_ids: correctAnswerIds,
      },
      { new: true },
    );

    // Populate the question with answers
    const populatedQuestion = await questionModel
      .findById(updatedQuestion._id)
      .populate('question_answer_ids')
      .populate('correct_answer_ids')
      .exec();

    return populatedQuestion;
  }

  /**
   * create answer for question
   * @param {Object} answerData - The data for the answer to be created.
   * @returns {Promise<Object>} - The created answer object.
   */

  static async createAnswer({ text, image = '', attributes = {} }) {
    const answerStore = await answerModel.create({
      text,
      image,
      attributes,
    });
    return answerStore;
  }

  /**
   * check correct answer for question
   */
  static async checkCorrectAnswer({ questionId, answerIds = [] }) {
    const questionFound = await questionModel.findById(questionId);
    if (!questionFound) {
      throw new BadRequestError('invalid');
    }
    const result = {
      isCorrect: false,
      point: 0,
    };
    switch (questionFound.question_type) {
      case 'single':
        result.isCorrect = questionFound.correct_answer_ids.some((correctAnswerId) => {
          return answerIds.includes(correctAnswerId.toString());
        });
        result.point = result.isCorrect ? questionFound.question_point : 0;
        return result;
      case 'multiple':
        result.isCorrect =
          questionFound.correct_answer_ids.every((correctAnswerId) => {
            return answerIds.includes(correctAnswerId.toString());
          }) && questionFound.correct_answer_ids.length === answerIds.length;

        if (result.isCorrect) {
          result.point = questionFound.question_point;
        } else {
          // count correct answer
          const correctCount = questionFound.correct_answer_ids.filter((correctAnswerId) => {
            return answerIds.includes(correctAnswerId.toString());
          }).length;
          result.point =
            (questionFound.question_point / questionFound.correct_answer_ids.length) * correctCount;
        }
        return result;
      case 'fill':
        // check length and index
        if (questionFound.correct_answer_ids.length !== answerIds.length) {
          return false;
        }
        return questionFound.correct_answer_ids.every((correctAnswerId, index) => {
          return correctAnswerId.toString() === answerIds[index];
        });
      case 'order':
        // check length and index
        if (questionFound.correct_answer_ids.length !== answerIds.length) {
          return false;
        }
        return questionFound.correct_answer_ids.every((correctAnswerId, index) => {
          return correctAnswerId.toString() === answerIds[index];
        });
      case 'match':
        return true;
      default: {
        throw new BadRequestError('type invalid');
      }
    }
  }

  /**
   * get quiz details by ID
   * @param {string} quizId - The ID of the quiz
   * @returns {Promise<Object>} - Quiz details
   */
  static async getQuizDetails({ quizId }) {
    const quiz = await quizModel.findById(quizId).populate('subject_ids', 'subject_name').exec();

    if (!quiz || quiz.quiz_status === 'deleted') {
      throw new BadRequestError('Quiz not found');
    }

    // Return quiz with additional user information but keep user_id as ObjectId for easy comparison
    const response = {
      ...quiz.toObject(),
      user_info: null,
      shared_users_info: [],
    };

    // Optionally populate user info separately if needed for display
    if (quiz.user_id) {
      const userModel = require('@v1/models/user.model');
      const userInfo = await userModel.findById(quiz.user_id).select('user_fullname user_avatar');
      response.user_info = userInfo;
    }

    // Populate shared users info if needed
    if (quiz.shared_user_ids && quiz.shared_user_ids.length > 0) {
      const userModel = require('@v1/models/user.model');
      const sharedUsersInfo = await Promise.all(
        quiz.shared_user_ids.map(async (sharedUser) => {
          const userInfo = await userModel
            .findById(sharedUser.user_id)
            .select('user_fullname user_email');
          return {
            ...sharedUser.toObject(),
            user_info: userInfo,
          };
        }),
      );
      response.shared_users_info = sharedUsersInfo;
    }

    return response;
  }

  /**
   * get question details by ID
   * @param {string} questionId - The ID of the question
   * @returns {Promise<Object>} - Question details in V2 format
   */
  static async getQuestionDetails({ questionId }) {
    const question = await questionModel
      .findById(questionId)
      .populate('question_answer_ids')
      .populate('correct_answer_ids')
      .exec();

    if (!question) {
      throw new BadRequestError('Question not found');
    }

    // Return V2 structure
    return {
      id: question._id,
      question: question.question_excerpt,
      description: question.question_description,
      audio: question.question_audio,
      image: question.question_image,
      video: question.question_video,
      point: question.question_point,
      time: question.question_time,
      explanation: question.question_explanation,
      type: question.question_type,
      options: question.question_answer_ids.map((answer) => ({
        id: answer._id,
        text: answer.text,
        image: answer.image || '',
        correct: question.correct_answer_ids.some(
          (correctAnswer) => correctAnswer._id.toString() === answer._id.toString(),
        ),
        attributes: answer.attributes || {},
      })),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }

  /**
   * delete question by ID
   * @param {string} questionId - The ID of the question to delete
   * @param {string} user_id - The ID of the user requesting deletion
   * @returns {Promise<Object>} - Deletion result
   */
  static async deleteQuestionV1({ questionId, user_id }) {
    const question = await questionModel.findById(questionId);
    if (!question) {
      throw new BadRequestError('Question not found');
    }

    // Check if user has permission to delete this question
    const quiz = await quizModel.findById(question.quiz_id);
    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    const hasPermission =
      quiz.user_id.toString() === user_id ||
      quiz.shared_user_ids.some((shared) => shared.user_id.toString() === user_id && shared.isEdit);

    if (!hasPermission) {
      throw new BadRequestError("You don't have permission to delete this question");
    }

    // Delete all answers associated with this question
    if (question.question_answer_ids.length > 0) {
      await answerModel.deleteMany({ _id: { $in: question.question_answer_ids } });
    }

    // Delete the question
    const deletedQuestion = await questionModel.findByIdAndDelete(questionId);

    return {
      success: true,
      question: deletedQuestion,
      message: 'Question and associated answers deleted successfully',
    };
  }

  /**
   * update quiz
   * @param {Object} updateData - The data to update
   * @returns {Promise<Object>} - Updated quiz
   */
  static async updateQuiz({ quizId, name, description, status, thumb, subject_ids = [], user_id }) {
    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Check if user has permission to edit
    const isOwner = quiz.user_id.toString() === user_id;
    const hasEditPermission = quiz.shared_user_ids.some(
      (shared) => shared.user_id.toString() === user_id && shared.isEdit,
    );

    if (!isOwner && !hasEditPermission) {
      throw new BadRequestError("You don't have permission to edit this quiz");
    }

    // Validate subjects if provided
    if (subject_ids.length > 0) {
      const isSubjectsExist = await subjectsIsExit(subject_ids);
      if (!isSubjectsExist) {
        throw new BadRequestError('Subject invalid');
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.quiz_name = name;
    if (description !== undefined) updateData.quiz_description = description;
    if (status !== undefined) updateData.quiz_status = status;
    if (thumb !== undefined) updateData.quiz_thumb = thumb;
    if (subject_ids.length > 0) {
      updateData.subject_ids = subject_ids.map((id) => ObjectId.createFromHexString(id));
    }

    const updatedQuiz = await quizModel.findByIdAndUpdate(quizId, updateData, { new: true });

    return updatedQuiz;
  }

  /**
   * delete quiz
   * @param {string} quizId - The ID of the quiz to delete
   * @param {string} user_id - The ID of the user requesting deletion
   * @returns {Promise<Object>} - Deletion result
   */
  static async deleteQuiz({ quizId, user_id }) {
    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Only owner can delete quiz
    if (quiz.user_id.toString() !== user_id) {
      throw new BadRequestError("You don't have permission to delete this quiz");
    }

    // Soft delete - change status to deleted
    const deletedQuiz = await quizModel.findByIdAndUpdate(
      quizId,
      { quiz_status: 'deleted' },
      { new: true },
    );

    return { success: true, quiz: deletedQuiz };
  }

  /**
   * duplicate quiz
   * @param {string} quizId - The ID of the quiz to duplicate
   * @param {string} user_id - The ID of the user requesting duplication
   * @returns {Promise<Object>} - Duplicated quiz
   */
  static async duplicateQuiz({ quizId, user_id }) {
    const originalQuiz = await quizModel.findById(quizId);

    if (!originalQuiz) {
      throw new BadRequestError('Quiz not found');
    }

    // Check if quiz is published or user has access
    const hasAccess =
      originalQuiz.quiz_status === 'published' ||
      originalQuiz.user_id.toString() === user_id ||
      originalQuiz.shared_user_ids.some((shared) => shared.user_id.toString() === user_id);

    if (!hasAccess) {
      throw new BadRequestError("You don't have access to this quiz");
    }

    // Create duplicate quiz
    const duplicateData = {
      user_id: user_id,
      quiz_name: `${originalQuiz.quiz_name} (Copy)`,
      quiz_description: originalQuiz.quiz_description,
      quiz_status: 'unpublished',
      quiz_thumb: originalQuiz.quiz_thumb,
      subject_ids: originalQuiz.subject_ids,
    };

    const duplicatedQuiz = await quizModel.create(duplicateData);

    // Duplicate questions if any
    const originalQuestions = await questionModel.find({ quiz_id: quizId });

    for (const question of originalQuestions) {
      const duplicatedQuestion = await questionModel.create({
        quiz_id: duplicatedQuiz._id,
        question_excerpt: question.question_excerpt,
        question_description: question.question_description,
        question_image: question.question_image,
        question_audio: question.question_audio,
        question_video: question.question_video,
        question_point: question.question_point,
        question_time: question.question_time,
        question_explanation: question.question_explanation,
        question_type: question.question_type,
        question_answer_ids: question.question_answer_ids,
        correct_answer_ids: question.correct_answer_ids,
      });
    }

    return duplicatedQuiz;
  }
}

module.exports = QuizService;
