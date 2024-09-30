const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Question';
const COLLECTION_NAME = 'Questions';
// Declare the Schema of the Mongo model
var questionSchema = new mongoose.Schema(
	{
		question_excerpt: {
			type: String,
			required: true,
		},
		question_description: {
			type: String,
			required: true,
		},
		question_audio: {
			type: String,
			default: '',
		},
		question_image: {
			type: String,
			default: '',
		},
		question_video: {
			type: String,
			default: '',
		},
		question_point: {
			type: Number,
			default: 1,
		},
		question_time: {
			type: Number,
			default: 30,
		},
		question_explanation: {
			type: String,
		},
		question_type: {
			type: String,
			enum: ['single', 'multiple', 'truefalase', 'blank', 'box'],
			default: 'single',
		},
		question_answer_ids: {
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
module.exports = mongoose.model(DOCUMENT_NAME, questionSchema);
