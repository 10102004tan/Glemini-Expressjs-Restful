'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const provinceSchema = new Schema(
  {
    province_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Province', provinceSchema);
