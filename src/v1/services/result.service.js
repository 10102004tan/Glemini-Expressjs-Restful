'use strict';
const ResultModel = require('../models/result.model');
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
            // Nếu kết quả chưa tồn tại, tạo một kết quả mới với trạng thái "Đang thực hiện"
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
            // Nếu kết quả đã tồn tại và trạng thái là "Đã hoàn thành", đổi lại thành "Đang thực hiện"
            if (result.status === 'Đã hoàn thành') {
                result.status = 'Đang thực hiện';
            }
        }

        // Kiểm tra xem câu hỏi đã tồn tại trong result_questions chưa
        const questionIndex = result.result_questions.findIndex(
            (q) => q.question_id.toString() === question_id.toString()
        );

        if (questionIndex !== -1) {
            // Nếu câu hỏi đã tồn tại, cập nhật lại câu trả lời
            result.result_questions[questionIndex] = {
                question_id,
                answer,
                correct,
                score,
            };
        } else {
            // Nếu câu hỏi chưa tồn tại, thêm mới
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

        const result = await ResultModel.findOne(query);
        
        if (!result) {
            throw new BadRequestError('Result not found');
        }

        return result;
    }
}

module.exports = ResultService;
