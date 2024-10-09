const mongoose = require('mongoose'); // Erase if already required
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
	}
);

//Export the model
module.exports = mongoose.model('Answer', answerSchema);
