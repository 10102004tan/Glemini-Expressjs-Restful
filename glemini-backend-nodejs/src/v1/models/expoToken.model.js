'use strict';

const { model, Schema } = require('mongoose');

const expoTokenSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: Schema.Types.String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('ExpoToken', expoTokenSchema);
