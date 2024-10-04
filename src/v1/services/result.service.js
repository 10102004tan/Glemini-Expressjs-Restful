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
                status: 'Đang thực hiện',
                result_questions: [],
            });

            if (exercise_id) {
                result.exercise_id = exercise_id;
            }
        } else {
            if (result.status === 'Đã hoàn thành') {
                result.status = 'Đang thực hiện';
            }
        }

        const questionIndex = result.result_questions.findIndex(
            (q) => q.question_id.toString() === question_id.toString()
        );

        if (questionIndex !== -1) {
            result.result_questions[questionIndex] = {
                question_id,
                answer,
                correct,
                score,
            };
        } else {
            result.result_questions.push({
                question_id,
                answer,
                correct,
                score,
            });
        }

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
            { status: 'Đã hoàn thành' },
            { new: true }
        );

        if (!result) {
            throw new BadRequestError('Result not found');
        }

        return result;
    }

    static async single({ exercise_id, user_id, quiz_id }) {
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }
    
        const result = await ResultModel.findOne(query).populate('result_questions.question_id'); // Giả sử question_id là ObjectId trong result_questions
    
        if (!result) {
            throw new BadRequestError('Result not found');
        }
    
        // Lấy thông tin câu hỏi từ question model
        const questions = await QuestionModel.find({
            _id: { $in: result.result_questions.map(q => q.question_id) }
        });
    
        result.result_questions = result.result_questions.map(rq => {
            const question = questions.find(q => q._id.toString() === rq.question_id.toString());
            return {
                ...rq,
                question: question ? question.text : null,
            };
        });
    
        return result;
    }
    
}

module.exports = ResultService;
