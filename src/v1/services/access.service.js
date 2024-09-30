'use strict';
const { createKeyPair } = require('../auths');
const { BadRequestError } = require('../cores/error.repsone');
const { findUserByEmail } = require('../models/repositories/user.repo');
const { findKeyTokenByUserId } = require('../models/repositories/keyToken.repo');
const KeyTokenService = require('./keyToken.service');
const { UserFactory } = require('./user.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AccessSevice {
    static async signup({ fullname, email, password, type, attributes }) {

        // check if email is already used
        const foundUser = await findUserByEmail(email);

        if (foundUser) {
            throw new BadRequestError("Email is already used");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if (!hashPassword) {
            throw new BadRequestError("Sigup failed");
        }

        const newUser = await UserFactory.createUser(
            type,
            {
                user_fullname: fullname,
                user_email: email,
                user_password: hashPassword,
                user_attributes: attributes
            }
        );

        //create key pair for user
        if (newUser) {
            // create key pair
            const publicKey = await crypto.randomBytes(64).toString('hex');
            const privateKey = await crypto.randomBytes(64).toString('hex');


            //store key pair
            const keyToken = await KeyTokenService.storeKeyToken({
                user_id: newUser._id,
                public_key: publicKey,
                private_key: privateKey
            });

            if (!keyToken) {
                throw new BadRequestError("Cannot store key token");
            }

            // create access token and refresh token

            // return user with key token

            const payload = {
                user_id: newUser._id,
                user_email: newUser.user_email,
                user_type: newUser.user_type
            };

            const tokens = await createKeyPair({ payload, publicKey, privateKey });

            if (!tokens) {
                throw new BadRequestError("Cannot create key pair");
            }

            // update refresh token
            await KeyTokenService.updateRefreshTokenById({
                userId: newUser._id,
                refreshToken: tokens.refreshToken
            });

            return {
                user: newUser,
                tokens: tokens
            }
        }

    }

    static async login({ email, password }) {
        const foundUser = await findUserByEmail(email);

        if (!foundUser) {
            throw new BadRequestError("User not found");
        }

        const match = await bcrypt.compare(password, foundUser.user_password);
        if (!match) {
            throw new BadRequestError("Password is incorrect");
        }



        //store key pair
        const keyToken = await findKeyTokenByUserId(foundUser._id);

        if (!keyToken) {
            throw new BadRequestError("Cannot store key token");
        }

        // create access token and refresh token

        // return user with key token

        const payload = {
            user_id: foundUser._id,
            user_email: foundUser.user_email,
            user_type: foundUser.user_type
        };

        const tokens = await createKeyPair({ payload, publicKey: keyToken.public_key, privateKey: keyToken.private_key });

        if (!tokens) {
            throw new BadRequestError("Cannot create key pair");
        }

        // update refresh token
        await KeyTokenService.updateRefreshTokenById({
            userId: foundUser._id,
            refreshToken: tokens.refreshToken
        });

        return {
            user: foundUser,
            tokens: tokens
        }

    }


    static async logout({user_id}) {
       const del = await KeyTokenService.removeRefreshTokenById(user_id);
       if (!del) {
           throw new BadRequestError("Logout failed");
       }
         return true;
    }
}

module.exports = AccessSevice;