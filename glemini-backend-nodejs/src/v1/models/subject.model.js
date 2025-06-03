const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo
var subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumb: {
    type: String,
    default: '',
  },
  quiz_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Quiz',
    default: [],
  },
});

//Export the model
module.exports = mongoose.model('Subject', subjectSchema);
