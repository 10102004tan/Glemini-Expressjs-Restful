'use strict';

const {model,Schema} = require('mongoose');

const expoTokenSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    // user->login->expoToken
    // user->logout-> remove expoToken
    // {token: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',status:'active'}
    tokens:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
});

module.exports = model('ExpoToken',expoTokenSchema);