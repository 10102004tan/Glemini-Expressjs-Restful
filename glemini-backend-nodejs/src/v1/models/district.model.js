'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const districtSchema = new Schema(
  {
    province: {
      type: Schema.Types.ObjectId,
      ref: 'Province',
    },
    district_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('District', districtSchema);
