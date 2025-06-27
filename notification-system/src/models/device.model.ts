/**
 * @file device.model.ts
 * @description Mongoose schema for device management in the notification service.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
'use strict';

import { model, Schema } from 'mongoose';

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

export default model('Device', deviceSchema);
