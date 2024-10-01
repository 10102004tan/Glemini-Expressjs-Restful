const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const DOCUMENT_NAME = 'Result';
const COLLECTION_NAME = 'Results';

const resultSchema = new Schema(
    {
        exercise_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Exercise',
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
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
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Question',
                },
                answer: {
                    type: String,
                    required: true,
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
        collection: COLLECTION_NAME,
    }
);

module.exports = model(DOCUMENT_NAME, resultSchema);
