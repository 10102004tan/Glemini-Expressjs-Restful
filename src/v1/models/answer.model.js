const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Answer';
const COLLECTION_NAME = 'Answers';
// Declare the Schema of the Mongo model
var answerSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, answerSchema);
