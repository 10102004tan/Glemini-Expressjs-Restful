'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    student_code: {
        type: String,
        default: ''
    },
    school_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'School'
    },
    student_parent_email:{
        type:String,
        default:''
    },
    class_ids:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true
});

module.exports = model('Student', studentSchema);