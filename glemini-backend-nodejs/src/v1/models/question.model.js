const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema(
  {
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz', // Liên kết đến model 'Quiz'
      required: true,
    },
    question_excerpt: {
      type: String,
      required: true,
    },
    question_description: {
      type: String,
      default: '',
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
      default: '',
    },
    question_type: {
      type: String,
      enum: ['single', 'multiple', 'truefalse', 'blank', 'box','match','order','fill'],
      default: 'single',
    },
    question_answer_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer', // Liên kết đến model 'Answer'
      },
    ],
    correct_answer_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer', // Liên kết đến model 'Answer'
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Question', questionSchema);
