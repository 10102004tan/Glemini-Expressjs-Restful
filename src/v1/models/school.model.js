'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    school_name: {
        type: String,
        required: true
    },
    school_location:{
        type:String,
        required:true
    },
    school_description:{
        type:String,
    },
    teacher_ids:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true
});

module.exports = model('School', schoolSchema);