'use strict';

const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const userSchema = new Schema({
   user_fullname:{
         type:String,
         required:true
    },
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        enum:['teacher','student'],
        required:true,
        default:'student'
    },
    user_phone:{
        type:String,
    },
    user_avatar:{
        type:String,
        default:''
    },
    user_status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
}, {
    timestamps: true
});

module.exports = model('User', userSchema);