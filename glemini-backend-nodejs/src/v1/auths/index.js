'use strict';
const JWT = require('jsonwebtoken');
const { HEADER } = require('../utils');
const { UnauthorizedError, NotFoundError } = require('../cores/error.repsone');
const { findUserByEmail, findUserById, findUserByIdV2 } = require('../models/repositories/user.repo');
const { findKeyTokenByUserId } = require('../models/repositories/keyToken.repo');
const { findStatusTeacher } = require('../models/repositories/teacher.repo');
const { get } = require("../models/repositories/kvStore.repo")

const createKeyPair = async ({
    payload,
    publicKey,
    privateKey
}) => {
    // use public key for access token

    const accessToken = await JWT.sign(payload, publicKey, {
        expiresIn: '2 days'
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
        expiresIn: '7 days'
    });

    return {
        accessToken,
        refreshToken
    };
};


const authentication = async (req, res, next) => {


    const userId = req.headers[HEADER.CLIENT_ID];

    if (!userId) {
        throw new UnauthorizedError("unauthorized");
    }

    const tokens = await findKeyTokenByUserId(userId);


    if (!tokens) {
        throw new UnauthorizedError("unauthorized");
    }

    // check endpoint is refresh 
    if (req.path === '/refresh-token') {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN];
        if (!refreshToken) {
            throw new UnauthorizedError("Refresh token is required");
        }

        await JWT.verify(refreshToken, tokens.private_key, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new UnauthorizedError("expired");
                }
                else {
                    throw new UnauthorizedError("Invalid refresh token 1");
                }
            }
            if (decoded.user_id !== userId) {
                throw new UnauthorizedError("Invalid refresh token 2");
            }
            // check token in blacklist
            req.user = decoded;
            req.refreshToken = refreshToken;
            next();
        });
    }
    else {
        const accessToken = req.headers[HEADER.AUTHORIZATION];

        if (!accessToken) {
            throw new UnauthorizedError("Access token is required");
        }

        await JWT.verify(accessToken, tokens.public_key, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new UnauthorizedError("expired");
                }
                else {
                    throw new UnauthorizedError("invalid token");
                }
            }

            if (decoded.user_id !== userId) {
                throw new UnauthorizedError("invalid token");
            }

            const isTokenBlkacklist = await get(`TOKEN_BLACK_LIST_${decoded.user_id}_${decoded.jit}`);
            if (isTokenBlkacklist) {
                throw new UnauthorizedError("expired");
            }
            req.user = decoded;
            next();
        });
    }

}

const verifyToken = async ({
    token, xClientId
}) => {
    if (!token) {
        throw new UnauthorizedError("unauthorized");
    }

    const keyToken = await findKeyTokenByUserId(xClientId);
    if (!keyToken) {
        console.log("No keyToken found for xClientId:", xClientId);
        socket.emit('unauthorized', 'No keyToken found');
        return;
    }

    try {
        const decoded = JWT.verify(token, keyToken.public_key);
        if (decoded.user_id !== xClientId) {
            throw new UnauthorizedError("invalid token");
        }
         const isTokenBlkacklist = await get(`TOKEN_BLACK_LIST_${decoded.user_id}_${decoded.jit}`);
        if (isTokenBlkacklist) {
            throw new UnauthorizedError("expired");
        }

        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedError("expired");
        } else {
            throw new UnauthorizedError("invalid token");
        }
    }
}


module.exports = {
    createKeyPair,
    authentication,
    verifyToken
};