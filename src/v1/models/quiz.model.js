const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Quiz';
const COLLECTION_NAME = 'Quizzes';
// Declare the Schema of the Mongo model
var quizSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
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
		shared_user_ids: {
			type: Array,
			default: [],
		},
		subject_ids: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, quizSchema);
