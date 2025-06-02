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
      default: 0,
    },

    shared_user_ids: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        isEdit: { type: Boolean, default: false },
      },
    ],

    subject_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

// create index for quiz_name full text search
quizSchema.index({ quiz_name: 'text' });

// if quiz_thumb null, set default image
quizSchema.pre('save', function (next) {
  if (!this.quiz_thumb) {
    this.quiz_thumb =
      'https://elearningindustry.com/wp-content/uploads/2021/10/Shareable-Quizzes-In-Online-Training-7-Reasons.jpg';
  }
  next();
});

module.exports = mongoose.model('Quiz', quizSchema);
