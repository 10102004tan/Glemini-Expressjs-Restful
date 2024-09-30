const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Quiz';
const COLLECTION_NAME = 'Quizzes';
// Declare the Schema of the Mongo model
var quizSchema = new mongoose.Schema(
	{
		
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, quizSchema);
