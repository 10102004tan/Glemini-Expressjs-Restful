'use strict';

const { BadRequestError } = require('../cores/error.repsone');
const KeyToken = require('../models/keyToken.model');
const {Types:{ObjectId}} = require('mongoose');

class KeyTokenService {
    static async storeKeyToken({ user_id, public_key, private_key}) {
        const keyToken = await KeyToken.create({
            user_id,
            public_key,
            private_key,
        });

        if (!keyToken) {
            throw new BadRequestError("Cannot store key token");
        }

        return keyToken;
    }

    static async updateRefreshTokenById({ userId,refreshToken}) {
        const keyToken = await KeyToken.findOneAndUpdate({
            user_id: userId
        }, {
            $set: {
                refresh_token: refreshToken
            }
        });

        if (!keyToken) {
            throw new BadRequestError("Cannot update key token");
        }

        return keyToken;
    }

    static async removeRefreshTokenById(userId) {
        return await KeyToken.findOneAndUpdate({
            user_id:  ObjectId.createFromHexString(userId+"")
        }, {
            $set: {
                refresh_token: null
            }
        });
    }
}

module.exports = KeyTokenService;