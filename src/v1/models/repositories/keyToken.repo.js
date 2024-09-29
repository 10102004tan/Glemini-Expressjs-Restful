'use strict';
const KeyToken = require('../../models/keyToken.model');

const findKeyTokenByUserId = async (userId) => {
    return await KeyToken.findOne({
        user_id: userId
    });
};

const removeRefreshToken = async (userId) => {
    return await KeyToken.findByIdAndUpdate({
        user_id: userId
    }, {
        $set: {
            refresh_token: null
        }
    });
};

module.exports = {
    findKeyTokenByUserId,
    removeRefreshToken
};