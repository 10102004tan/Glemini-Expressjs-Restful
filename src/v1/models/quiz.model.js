const mongoose = require('mongoose');
const { type } = require('os');

var quizSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Liên kết tới bảng User
			required: true,
		},
		quiz_name: {
			type: String,
			required: true,
		},
		quiz_description: {
			type: String,
			default: '',
		},
		quiz_status: {
			type: String,
			enum: ['deleted', 'published', 'unpublished'],
			default: 'unpublished',
		},
		quiz_thumb: {
			type: String,
			default: '',
		},
		quiz_turn: {
			type: Number,
			default: 0
		},
		shared_user_ids: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User', 
				default: [],
			},
		],
		subject_ids: [
			{
				type: mongoose.Schema.Types.ObjectId,
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Subject',
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Quiz', quizSchema);
