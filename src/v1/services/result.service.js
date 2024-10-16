'use strict';
const ResultModel = require('../models/result.model');
const QuestionModel = require('../models/question.model');
const { BadRequestError } = require('../cores/error.repsone');

class ResultService {
    static async saveQuestion({ exercise_id, user_id, quiz_id, question_id, answer, correct, score }) {
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }

        let result = await ResultModel.findOne(query);

        if (!result) {
            result = new ResultModel({
                user_id,
                quiz_id,
                status: 'doing',
                result_questions: [],
            });

            if (exercise_id) {
                result.exercise_id = exercise_id;
            }
        } else {
            if (result.status === 'completed') {
                result.status = 'doing';
                
                if (result.result_questions.length > 0) {
                    result.result_questions = [];
                }
            }

        }

        // Thêm câu trả lời mới vào mảng
        result.result_questions.push({
            question_id,
            answer,
            correct,
            score,
        });

        await result.save();

        return result;
    }


    static async completeQuiz({ exercise_id, user_id, quiz_id }) {
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }

        const result = await ResultModel.findOneAndUpdate(
            query,
            { status: 'completed' },
            { new: true },
            { runValidators: true }
        );

        if (!result) {
            throw new BadRequestError('Result not found');
        }

        return result;
    }

    static async review({ exercise_id, user_id, quiz_id }) {
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }

        const result = await ResultModel.findOne(query)
            .populate({
                path: 'result_questions.question_id',
                model: 'Question',
                populate: {
                    path: 'question_answer_ids',
                    model: 'Answer'
                }
            })
            .populate({
                path: 'result_questions.answer',
                model: 'Answer',
            });

        if (!result) {
            throw new BadRequestError('Result not found');
        }

        return result;
    }

}

module.exports = ResultService;
