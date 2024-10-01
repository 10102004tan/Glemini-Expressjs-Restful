'use strict';
const ResultModel = require('../models/result.model');
const { BadRequestError } = require('../cores/error.repsone');

class ResultService {
    // Save a single question result
    static async saveQuestion({ exercise_id, user_id, quiz_id, question_id, answer, correct, score }) {
        // Tạo điều kiện tìm kiếm, nếu không có exercise_id thì bỏ qua nó
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }

        let result = await ResultModel.findOne(query);

        if (!result) {
            // Create new result document if it doesn't exist
            result = new ResultModel({
                user_id,
                quiz_id,
                status: 'Đang thực hiện',
                result_questions: [],
            });

            // Thêm exercise_id nếu có
            if (exercise_id) {
                result.exercise_id = exercise_id;
            }
        }

        // Add result of the current question
        result.result_questions.push({
            question_id,
            answer,
            correct,
            score,
        });

        await result.save();

        return result;
    }

    // Update result status to "Đã hoàn thành"
    static async completeQuiz({ exercise_id, user_id, quiz_id }) {
        // Tạo điều kiện tìm kiếm, nếu không có exercise_id thì bỏ qua nó
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

    // Get single result
    static async single({ exercise_id, user_id, quiz_id }) {
        // Tạo điều kiện tìm kiếm, nếu không có exercise_id thì bỏ qua nó
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
