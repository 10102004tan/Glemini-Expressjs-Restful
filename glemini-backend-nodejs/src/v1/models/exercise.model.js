'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    classroom_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date_start: {
      type: Date,
      required: true,
      default: Date.now,
    },
    date_end: {
      type: Date,
      required: true,
      default: Date.now,
    },
    result_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Result',
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Exercise', exerciseSchema);
