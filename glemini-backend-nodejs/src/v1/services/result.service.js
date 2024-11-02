'use strict';
const ResultModel = require('../models/result.model');
const QuizModel = require('../models/quiz.model');
const exerciseModel = require('../models/exercise.model');
const { BadRequestError } = require('../cores/error.repsone');

class ResultService {
    static async saveQuestion({ exercise_id, user_id, quiz_id, question_id, answer, correct, score }) {
        console.log(exercise_id);
        
        const query = {
            user_id,
            quiz_id,
        };
        if (exercise_id) {
            query.exercise_id = exercise_id;
        }
    
        let result = await ResultModel.findOne(query);
    
        if (!result) {
            // Create a new result document if none exists
            result = new ResultModel({
                user_id,
                quiz_id,
                status: 'doing',
                result_questions: [],
            });
    
            if (exercise_id) {
                result.exercise_id = exercise_id;
            }
    
            await result.save(); // Save the new result instance
    
            // If exercise_id exists, add the result._id to exercise.result_ids
            if (exercise_id) {
                await exerciseModel.findByIdAndUpdate(
                    exercise_id,
                    { $addToSet: { result_ids: result._id } },  // Ensures result_id is added only once
                    { new: true, runValidators: true }
                );
            }
        } else {
            // If a result already exists, update its status and clear questions if completed
            if (result.status === 'completed') {
                result.status = 'doing';
                result.result_questions = []; // Clear previous questions
            }
        }

        // Add the new question answer to result.result_questions
        result.result_questions.push({
            question_id,
            answer,
            correct,
            score,
        });
    
        await result.save(); // Save updated result
    
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

        // Update quiz play count
        await QuizModel.findOneAndUpdate(
            { _id: quiz_id },
            { $inc: { quiz_turn: 1 } }, 
            { new: true, runValidators: true }
        );

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

    async getResultsByUserId(userId, status) {

        if (!['doing', 'completed'].includes(status)) {
            throw new Error('Invalid status');
        }

        const results = await ResultModel.find({ user_id: userId, status })
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

        return results;
    }
}

module.exports = ResultService;
