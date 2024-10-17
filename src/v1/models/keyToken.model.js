'use strict';

const {model,Schema} = require('mongoose');

const keyTokenSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    public_key:{
        type:String,
        required:true
    },
    private_key:{
        type:String,
        required:true
    },
    refresh_token:{
        type:String,
        default:''
    }
},{
    timestamps:true
});

module.exports = model('KeyToken',keyTokenSchema);