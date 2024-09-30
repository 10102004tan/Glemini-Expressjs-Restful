'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    teacher_status: {
        enum: ['active', 'inactive'],
    },
    teacher_attributes:{
        type: Array,
        default: []
    },
    file_urls:{
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = model('Teacher', teacherSchema);