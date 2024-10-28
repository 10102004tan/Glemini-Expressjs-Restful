'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const classroomSchema = new Schema({
    class_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Quiz"
        }
    ]
    ,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
}, {
    timestamps: true
});

module.exports = model('Classroom', classroomSchema);