'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const roomSchema = new Schema(
  {
    url: {
      type: String,
    },
    room_code: {
      type: String,
    },
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
    user_created_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user_join_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    user_max: {
      type: Number,
      default: 10,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['start', 'doing', 'completed', 'deleted'],
      default: 'start',
    },
    result_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Result',
      default: [],
    },
    room_time: {
      type: Number, // Thời gian tính từ lúc tạo phòng đến khi kết thúc bài thi (đơn vị: phút)
      default: 45, // Mặc định là 45 phút
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Room', roomSchema);
