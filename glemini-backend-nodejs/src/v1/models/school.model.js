'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    school_name: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    school_code:{
        type:String,
    },
    teacher_ids:{
        type:Array,
        default:[],
        ref: 'Teacher'
    }
}, {
    timestamps: true
});

module.exports = model('School', schoolSchema);