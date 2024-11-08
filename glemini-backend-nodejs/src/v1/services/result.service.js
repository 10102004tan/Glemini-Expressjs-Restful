'use strict';
const ResultModel = require('../models/result.model');
const QuizModel = require('../models/quiz.model');
const QuestionModel = require('../models/question.model');
const exerciseModel = require('../models/exercise.model');
const RoomModel = require('../models/room.model');
const { BadRequestError } = require('../cores/error.repsone');
const classroomModel = require('../models/classroom.model');

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

            await result.save();

            if (exercise_id) {
                await exerciseModel.findByIdAndUpdate(
                    exercise_id,
                    { $addToSet: { result_ids: result._id } },
                    { new: true, runValidators: true }
                );
            }
        } else {
            if (result.status === 'completed') {
                result.status = 'doing';
                result.result_questions = [];
            }
        }

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

        // Update quiz play count
        await QuizModel.findOneAndUpdate(
            { _id: quiz_id },
            { $inc: { quiz_turn: 1 } },
            { new: true, runValidators: true }
        );

        return result;
    }

    static async review({ exercise_id, user_id, quiz_id }) {
        if (!exercise_id && !quiz_id) {
            throw new BadRequestError("Don't get data review of a user");
        }
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

    // Student  in activity
    static async getResultsByUserId({ userId }) {
        if (!userId) {
            throw new BadRequestError('User ID is required');
        }

        const results = await ResultModel.find({ user_id: userId })
            .populate({
                path: 'quiz_id',
                select: 'quiz_name quiz_thumb user_id',
                populate: {
                    path: 'user_id',
                    select: 'user_fullname'

                },
            })
            .populate({
                path: 'result_questions.question_id',
                model: 'Question',
                populate: {
                    path: 'question_answer_ids',
                    model: 'Answer',
                },
            })
            .populate({
                path: 'exercise_id',
                select: 'name'

            });

        // Nhóm các kết quả theo trạng thái
        const categorizedResults = {
            completed: [],
            doing: []
        };

        for (const result of results) {
            const quiz = result.quiz_id;
            if (quiz) {
                const questionCount = await QuestionModel.countDocuments({ quiz_id: quiz._id });
                quiz.questionCount = questionCount;

                const resultWithQuestionCount = {
                    ...result.toObject(),
                    quiz_id: {
                        ...quiz.toObject(),
                        questionCount
                    }
                };

                // Phân loại kết quả
                if (result.status === 'completed') {
                    categorizedResults.completed.push(resultWithQuestionCount);
                } else {
                    categorizedResults.doing.push(resultWithQuestionCount);
                }
            }
        }

        return categorizedResults;
    }

    // Teacher in report
    static async getReportResults({ userId }) {
        if (!userId) {
            throw new BadRequestError('User ID is required');
        }
        try {
            // Lấy tất cả các phòng (Room) mà người dùng tạo
            const rooms = await RoomModel.find({ user_created_id: userId })
                .populate({
                    path: 'result_ids',
                    model: 'Result',
                    populate: [{
                        path: 'user_id',
                        select: 'user_fullname user_avatar user_email'
                    },
                    {
                        path: 'quiz_id',
                        select: 'quiz_name quiz_thumb'
                    },
                    {
                        path: 'result_questions.question_id',
                        select: 'question_excerpt question_description question_image question_point question_explanation question_answer_ids',
                        populate: {
                            path: 'question_answer_ids',
                            model: 'Answer',
                            select: 'text image'
                        }
                    },
                    {
                        path: 'result_questions.answer',
                        select: 'text image'
                    }]

                });

            // Lấy tất cả các lớp học (Classroom) mà người dùng là giáo viên
            const classrooms = await classroomModel.find({ user_id: userId })
                .populate({
                    path: 'exercises',
                    populate: {
                        path: 'result_ids',
                        model: 'Result',
                        populate: [{
                            path: 'user_id',
                            select: 'user_fullname user_avatar user_email'
                        },
                        {
                            path: 'quiz_id',
                            select: 'quiz_name quiz_thumb'
                        },
                        {
                            path: 'result_questions.question_id',
                            select: 'question_excerpt question_description question_image question_point question_explanation question_answer_ids',
                            populate: {
                                path: 'question_answer_ids',
                                model: 'Answer',
                                select: 'text image'
                            }
                        },
                        {
                            path: 'result_questions.answer',
                            select: 'text image'
                        }]

                    }
                });

            const allResults = [];

            rooms.forEach(room => {
                allResults.push({
                    id: room._id,
                    type: 'room',
                    identifier: room.room_code,
                    description: room.description,
                    results: room.result_ids
                });
            });

            // Kết quả từ các bài tập trong lớp học
            classrooms.forEach(classroom => {
                classroom.exercises.forEach(exercise => {
                    allResults.push({
                        id: exercise._id,
                        type: 'exercise',
                        identifier: exercise.name,
                        class_name: classroom.class_name,
                        subject: classroom.subject.name,
                        results: exercise.result_ids
                    });
                });
            });

            return allResults;
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    static async overview({ id }) {
        if (!id) {
            throw new BadRequestError("Don't get data overview of a user");
        }

        const result = await ResultModel.findById(id)
            .populate({
                path: 'user_id',
                select: 'user_fullname user_avatar'
            })
            .populate({
                path: 'result_questions.question_id',
                model: 'Question',
                populate: [{
                    path: 'question_answer_ids',
                    model: 'Answer'
                },{
                    path: 'correct_answer_ids',
                    model: 'Answer'
                }]
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
