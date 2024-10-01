'use strict';
const JWT = require('jsonwebtoken');
const { HEADER } = require('../utils');
const { UnauthorizedError } = require('../cores/error.repsone');
const { findUserByEmail, findUserById } = require('../models/repositories/user.repo');
const { findKeyTokenByUserId } = require('../models/repositories/keyToken.repo');

const createKeyPair = async ({
    payload,
    publicKey,
    privateKey
}) => {
    // use public key for access token
    // use private key for refresh token
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
        throw new UnauthorizedError("Unauthorized access");
    }

    const tokens = await findKeyTokenByUserId(userId);

    if (!tokens) {
        throw new UnauthorizedError("Access denied");
    }

    // check endpoint is refresh 
    if (req.path === '/refresh') {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN];
        if (!refreshToken) {
            throw new UnauthorizedError("Refresh token is required");
        }

        await JWT.verify(refreshToken, tokens.private_key, (err, decoded) => {
            if (err) {
                throw new UnauthorizedError("Invalid refresh token 1");
            }
            console.log(decoded);
            if (decoded.user_id !== userId) {
                throw new UnauthorizedError("Invalid refresh token 2");
            }
            req.user = decoded;
            req.refreshToken = refreshToken;
            next();
        });
    }
    else{
        const accessToken = req.headers[HEADER.AUTHORIZATION];

        if (!accessToken) {
            throw new UnauthorizedError("Access token is required");
        }
    
        await JWT.verify(accessToken, tokens.public_key, (err, decoded) => {
            if (err) {
                throw new UnauthorizedError("Invalid access token");
            }
    
            if (decoded.user_id !== userId) {
                throw new UnauthorizedError("Invalid access token");
            }
            req.user = decoded;
            next();
        });
    }

}


module.exports = {
    createKeyPair,
    authentication
};