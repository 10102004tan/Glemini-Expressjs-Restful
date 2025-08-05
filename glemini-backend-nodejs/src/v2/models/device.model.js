'use strict';

const { model, Schema } = require('mongoose');

const deviceSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    device_token: {
      type: Schema.Types.String,
      required: false,
      default: '',
    },
    device_os: {
      type: Schema.Types.String,
        required: true,
        enum: ['android', 'ios'],
    },
    device_name: {
      type: Schema.Types.String,
      required: true,
      default: 'unknown',
    },
    last_logged_in_at:{
        type: Schema.Types.Date,
        required: false,
        default: Date.now,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = model('Device', deviceSchema);
