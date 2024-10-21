'use strict';
const { default: mongoose } = require('mongoose');
const KeyToken = require('../../models/keyToken.model');

const findKeyTokenByUserId = async (userId) => {
    return await KeyToken.findOne({
        user_id: userId
    });
};

const removeRefreshToken = async (userId) => {
    // const userId =
    // convert userId to ObjectId
    userId = mongoose.Types.ObjectId(userId);
    return await KeyToken.findByIdAndUpdate({
        user_id: userId
    }, {
        $set: {
            refresh_token: null
        }
    });
};

const findKeyTokenByUserIdAndRefreshToken = async (userId, refreshToken) => {
    return await KeyToken.findOne({
        user_id: userId,
        refresh_token: refreshToken
    });
};

module.exports = {
    findKeyTokenByUserId,
    removeRefreshToken,
    findKeyTokenByUserIdAndRefreshToken
};