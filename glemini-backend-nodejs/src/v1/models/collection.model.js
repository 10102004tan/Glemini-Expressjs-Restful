'use strict';

const { model, Schema } = require('mongoose');

const collectionSchema = new Schema(
  {
    collection_name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Collection', collectionSchema);
