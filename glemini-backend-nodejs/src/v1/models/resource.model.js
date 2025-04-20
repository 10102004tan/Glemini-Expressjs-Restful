'use strict';

const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const resourceSchema = new Schema({
    resource_name:{
        type:String,
        required:true,
        unique:true
    },
    resource_description:{
        type:String,
        default:''
    }
}, {
    timestamps: true
})

module.exports = model('Resource', resourceSchema);