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
},{
    timestamps:true
});

module.exports = model('KeyToken',keyTokenSchema);