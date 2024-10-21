'use strict';

const {model,Schema} = require('mongoose');

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'notifications';

// SYS-001 :: notfication for maintenance
// SYS-002 :: notfication for events


// ban nhan duoc 1 noti tu 1 giaovienabc nao do
const notificationSchema = new Schema({
    noti_type:{
        type:String,
        enum:['SYS-001','SYS-002'],
        required:true
    },
    noti_senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    noti_receiverId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    noti_content:{
        type:String,
        required:true
    },
    noti_options:{
        type:Object,
        default:{}
    }
},{
    timestamps:true,
});

module.exports = model(DOCUMENT_NAME,notificationSchema,COLLECTION_NAME);