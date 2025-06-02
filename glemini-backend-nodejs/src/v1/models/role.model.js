'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const roleSchema = new Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
    },
    role_description: {
      type: String,
      default: '',
    },
    role_permissions: [
      {
        resource: {
          type: Schema.Types.ObjectId,
          ref: 'Resource',
          required: true,
        },
        actions: {
          type: String,
          required: true,
        },
        attributes: {
          type: String,
          default: '*',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Role', roleSchema);
