const mongoose = require('mongoose');

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
		shared_user_ids: [
			{
				type: [mongoose.Schema.Types.ObjectId],
				ref: 'User', // Liên kết đến bảng User
				default: [],
			},
		],
		subject_ids: [
			{
				type: [mongoose.Schema.Types.ObjectId],
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
