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
const {BadRequestError} = require('@v1/cores/error.repsone');
const { answersIsExit } = require('@v1/models/repositories/answer.repo');
const answerModel = require('@v1/models/answer.model');
const { sortRandomArray } = require('../util');

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

  /**
   * Get questions by quiz ID.
   * @param {ObjectId} quizId - The ID of the quiz.
   * @returns {Promise<Array>} - An array of questions associated with the quiz.
   */
  static async getQuestionsByQuiz({
    quizId
  }){
    /**
     * {
      id: 1,
      question: 'What is the capital of France?',
      options: [
        {
          id: 1,
          text: 'Paris',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77FladSUDfZrsWEf9Vf1RSh752wuXXE52ig&s',
        },
        {
          id: 2,
          text: 'London',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77FladSUDfZrsWEf9Vf1RSh752wuXXE52ig&s',
        },
        {
          id: 3,
          text: 'Berlin',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77FladSUDfZrsWEf9Vf1RSh752wuXXE52ig&s',
        },
        {
          id: 4,
          text: 'Madrid',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77FladSUDfZrsWEf9Vf1RSh752wuXXE52ig&s',
        },
      ],
      type: 'single',
    }
     */
    const result = {
      items: [],
      totalPage: 0,
      totalItems: 0,
    }

    const questions = await questionModel
          .find({ quiz_id:quizId })
          .populate('question_answer_ids')
          .populate('correct_answer_ids')
          .exec();

    result.totalItems = questions.length;
    result.totalPage = Math.ceil(result.totalItems / 20);

    const newQuestions = questions.map((question) => {
      const item = {
        id: question._id.toString(),
        question: question.question_excerpt,
        options: question.question_answer_ids.map((answer) => ({
          id: answer._id.toString(),
          text: answer.text,
          image: answer.image || '',
          attributes: answer.attributes || {},
        })),
        type: question.question_type,
      }
      if (question.question_type === "match"){
        const leftOptions = item.options.map((option) => {
          return {
            text: option.text,
          }
        });
        const rightOptions = item.options.map((option) => {
          console.log("option.attributes", option);
          return {
            text: option.attributes?.match || "",
          }
        })

        item.options = [
          {
            id: 'left',
            items: sortRandomArray(leftOptions),
          },
          {
            id: 'right',
            items: sortRandomArray(rightOptions),
          }
        ]
      }else{
        item.options = sortRandomArray(item.options);
      }
      // remove attributes
      delete item.options.attributes;
      return item;
    });

    result.items = newQuestions;

    return result;
  }

  /**
   * create quiz
   * @param {Object} quizData - The data for the quiz to be created.
   * @returns {Promise<Object>} - The created quiz object.
   */

  static async createQuiz({
    name,
    user_id,
    description,
    status,
    thumb,
    subject_ids=[]
  }) {
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
      throw new BadRequestError("quiz not found!!!")
    }

    const isAnswerExit = await answersIsExit(answerIds);
    if (!isAnswerExit) {
      throw new BadRequestError("answer invalid!!!");
    }

    const isCorrectAnswerExit = await answersIsExit(correctAnswerIds);

    if (!isCorrectAnswerExit) {
      throw new BadRequestError("answer invalid!!!");
    }

    if (type === 'match') {
      if (answerIds.length < 2) {
        throw new BadRequestError("match question must have at least 2 answers");
      }
      if (correctAnswerIds.length !== answerIds.length) {
        throw new BadRequestError("match question must have the same number of correct answers as answers");
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
      correct_answer_ids: correctAnswerIds.map((answerId) => ObjectId.createFromHexString(answerId)),
    });
    return questionStore;
  }

  /**
   * create answer for question
   * @param {Object} answerData - The data for the answer to be created.
   * @returns {Promise<Object>} - The created answer object.
   */

  static async createAnswer({
    text,
    image = '',
    attributes = {},
  }) {
    
    const answerStore = await answerModel.create({
      text,
      image,
      attributes
    })
    return answerStore;
  }

  /**
   * check correct answer for question
   */
  static async checkCorrectAnswer({
    questionId,
    answerIds = [],
  }) {
    const questionFound = await questionModel.findById(questionId);
    if (!questionFound) {
      throw new BadRequestError("invalid");
    }
    const result = {
      isCorrect: false,
      point:0,
    }
    switch (questionFound.question_type) {
      case 'single':
        result.isCorrect = questionFound.correct_answer_ids.some((correctAnswerId) => {
          return answerIds.includes(correctAnswerId.toString());
        });
        result.point = result.isCorrect ? questionFound.question_point : 0;
        return result;
      case 'multiple':
        result.isCorrect = questionFound.correct_answer_ids.every((correctAnswerId) => {
          return answerIds.includes(correctAnswerId.toString());
        }) && questionFound.correct_answer_ids.length === answerIds.length;

        if (result.isCorrect) {
          result.point = questionFound.question_point;
        }else {
          // count correct answer
          const correctCount = questionFound.correct_answer_ids.filter((correctAnswerId) => {
            return answerIds.includes(correctAnswerId.toString());
          }).length;
          result.point = questionFound.question_point / questionFound.correct_answer_ids.length * correctCount;
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
        throw new BadRequestError("type invalid");
      }
    }
  }
}

module.exports = QuizService;
