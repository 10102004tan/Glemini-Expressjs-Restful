'use strict';

const mongoose = require('mongoose');
const { type } = require('os');
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    attributes:{
        type: Array,
        default: []
        /**
         * {
            "name":"Cccd",
            "url":"https://example.com/cccd.png",
            "type":"image",
            "items":[
                {
                    field:"Ho ten",
                    value:"Nguyen Van A"
                },
                {
                    field:"Ngay sinh",
                    value:"01/01/2000"
                },
                {
                    field:"Gioi tinh",
                    value:"Nam"
                },
                {
                    field:"Que quan",
                    value:"Ha Noi"
                }
            ]
         * }
         */
    },
    schools:{
        type: Array,
        default: []
    },
    status:{
        type: String,
        enum: ['active', 'inactive','deleted','pending'],
        default: 'inactive'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Teacher', teacherSchema);