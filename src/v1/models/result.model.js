'use strict';

const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const resultSchema = new Schema({
    exercise_id: String,
    user_id: String,
    quiz_id: {type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["Đang thực hiện", "Đã hoàn thành", "Đang diễn ra", "Đã kết thúc"],
      },
    result_questions: Array
});

module.exports = model('Result', resultSchema);