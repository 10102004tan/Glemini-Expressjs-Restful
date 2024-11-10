const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const DOCUMENT_NAME = 'Result';

const resultSchema = new Schema(
	{
		exercise_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Exercise',
			default: null,
		},
		room_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
			default: null,
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
			enum: ['doing', 'completed', 'cancel'],
			default: 'doing',
		},
		result_questions: [
			{
				question_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Question',
				},
				answer: {
					type: [mongoose.Schema.Types.ObjectId],
					ref: 'Answer',
					default: [],
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
