'use strict';

const mongoose = require('mongoose');
const { type } = require('os');
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    // teacher_status: {
    //     type:String,
    //     enum: ['active', 'pedding','rejected'],
    //     default:'pedding'
    // },
    teacher_attributes:{
        type: Array,
        default: []
    },
    schools:{
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