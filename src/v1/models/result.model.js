const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const DOCUMENT_NAME = 'Result';

const resultSchema = new Schema(
    {
        exercise_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        quiz_id: {
            type: Number,
            required: true,
            ref: 'Quiz',
        },
        status: {
            type: String,
            enum: ['Đang thực hiện', 'Đã hoàn thành', 'Bị hủy'],
            default: 'Đang thực hiện',
        },
        result_questions: [
            {
                question_id: {
                    type: Number,
                    required: true,
                    ref: 'Question',
                },
                answer: {
                    type: [String],
                    required: true,
                    validate: {
                        validator: function (answers) {
                            // Nếu là single-choice thì chỉ cho phép một câu trả lời
                            return answers.length > 0;
                        },
                        message: 'Phải có ít nhất một đáp án được chọn.',
                    },
                },
                correct: {
                    type: Boolean,
                    required: true,
                },
                score: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model(DOCUMENT_NAME, resultSchema);
