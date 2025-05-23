'use strict';
const { createKeyPair } = require('../auths');
const { BadRequestError, InternalServerError } = require('../cores/error.repsone');
const { findUserByEmail, findUserById, updatePasswordByEmail, findStatusByUserId, findUserByEmailV2, findUserByIdV2, updateStatusUser } = require('../models/repositories/user.repo');
const { findKeyTokenByUserId, findKeyTokenByUserIdAndRefreshToken } = require('../models/repositories/keyToken.repo');
const KeyTokenService = require('./keyToken.service');
const { UserFactory } = require('./user.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UploadService = require('./upload.service');
const { updateStatusTeacher } = require('../models/repositories/teacher.repo');
const EmailService = require('./email.service');
const OTPService = require('./otp.service');
const { removeOTPbyEmail } = require('../models/repositories/otp.repo');
const { pushNoti } = require('./expo.service');
const { storeNewExpoToken, removeExpoToken, findExpoTokenByListUserId } = require('./expoToken.service');
const { pushNotiForSys } = require('./notification.service');
const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const { v4: uuidv4 } = require('uuid');
const { set } = require('../models/repositories/kvStore.repo');

class AccessSevice {
    static async signup({ fullname, email, password, type, user_expotoken, attributes, files, schoolIds }) {

        //
        if (!user_expotoken) {
            user_expotoken = null;
        }

        // check if email is already used
        const foundUser = await findUserByEmail(email);

        if (foundUser) {
            throw new BadRequestError("Email is already used");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if (!hashPassword) {
            throw new BadRequestError("Sigup failed");
        }

        if (type === 'teacher') {
            // upload images to cloudinary
            const uploadedUrls = await UploadService.uploadMultipleImagesFromFiles({
                files,
                folderName: `users/${email}/verification`
            });

            if (!uploadedUrls) {
                throw new BadRequestError("Cannot upload images");
            }

            // save images url to attributes
            if (uploadedUrls.length) {
                attributes = {
                    ...attributes,
                    file_urls: uploadedUrls.map(imageUrl => imageUrl.image_url)
                }
            }
        }

        const newUser = await UserFactory.createUser(
            type,
            {
                user_fullname: fullname,
                user_email: email,
                user_password: hashPassword,
                user_attributes: attributes,
                user_expotoken,
                user_type: type,
                user_schoolIds: schoolIds
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

            await EmailService.sendEmailWelcome({
                email: newUser.user_email
            });


            // add user_expotoken to expoToken
            const storeExpoToken = await storeNewExpoToken(newUser._id, user_expotoken);

            if (!storeExpoToken) {
                throw new BadRequestError("Cannot store expo token");
            }

            const data = {
                title: `Welcome ${newUser.user_fullname} to Glemini`,
                body: 'Thank you for joining us'
            }

            pushNoti({ data, somePushTokens: [user_expotoken] });

            return {
                user: newUser,
                tokens: tokens
            }
        }

    }
    static async login({ email, password, user_expotoken }) {
        const foundUser = await findUserByEmailV2(email);

        if (!foundUser) {
            throw new BadRequestError("Account not found");
        }

        console.log(foundUser);

        const match = await bcrypt.compare(password, foundUser.user_password);
        if (!match) {
            throw new BadRequestError("Password is incorrect");
        }

        if (foundUser.user_status !== "active") {
            throw new BadRequestError(`Acccount is ${foundUser.user_status}`);
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


        // add user_expotoken to expoToken
        await storeNewExpoToken(foundUser._id, user_expotoken);

        return {
            user: foundUser,
            tokens: tokens
        }

    }
    static async logout({ user_id, user_expotoken }) {
        const del = await KeyTokenService.removeRefreshTokenById(user_id);
        if (!del) {
            throw new BadRequestError("Logout failed");
        }

        await removeExpoToken(user_id, user_expotoken);

        return true;
    }
    static async changePassword({ email, old_password, new_password }) {

        const foundUser = await findUserByEmail(email);

        if (!foundUser) {
            throw new BadRequestError("User not found");
        }

        const match = await bcrypt.compare(old_password, foundUser.user_password);

        if (!match) {
            throw new BadRequestError("Old password is incorrect");
        }

        const hashPassword = await bcrypt.hash(new_password, 10);

        if (!hashPassword) {
            throw new BadRequestError("Change password failed");
        }


        const updated = await updatePasswordByEmail({ email, password: hashPassword });



        if (!updated) {
            throw new BadRequestError("Change password failed");
        }

        const keyToken = await findKeyTokenByUserId(foundUser._id);

        // update refresh token
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
    static async refresh({ user, refreshToken }) {

        const keyToken = await findKeyTokenByUserIdAndRefreshToken(user.user_id, refreshToken);

        if (!keyToken) {
            throw new BadRequestError("User not found");
        }

        // create access token and refresh token
        const payload = {
            user_id: user.user_id,
            user_email: user.user_email,
            user_type: user.user_type
        };

        const tokens = await createKeyPair({ payload, publicKey: keyToken.public_key, privateKey: keyToken.private_key });

        if (!tokens) {
            throw new BadRequestError("Cannot create key pair");
        }

        // update refresh token
        await KeyTokenService.updateRefreshTokenById({
            userId: user.user_id,
            refreshToken: tokens.refreshToken
        });

        return {
            user,
            tokens: tokens
        }
    }
    static async getStatus({ user_id, user_type }) {
        const status = await findStatusByUserId({ id: user_id, type: user_type });

        if (!status) {
            throw new BadRequestError("User not found");
        }
        return status;
    }
    static async forgotPassword({ email }) {
        //flow : 
        // check if email is exist
        // create token
        // send email with token
        const foundUser = await findUserByEmail(email);

        if (!foundUser) {
            throw new BadRequestError("Account not exist");
        }

        return await EmailService.sendEmailOTP({
            email,
            name: foundUser.user_fullname
        })

    };

    // otp verify
    static async verifyOtp({ email, otp }) {
        otp = otp.toString();
        const verifyOTP = await OTPService.verifyOTP({ email, otp });
        if (!verifyOTP) {
            throw new BadRequestError("OTP is incorrect");
        }
        return 1;
    }

    // reset password
    static async resetPassword({ email, password, otp }) {

        const foundUser = await findUserByEmail(email);

        if (!foundUser) {
            throw new BadRequestError("Account not exist");
        }

        await OTPService.verifyOTP({ email, otp });

        // remove otp
        const removeOTP = await removeOTPbyEmail(email);

        if (!removeOTP) {
            throw new BadRequestError("OTP is expired, please try again");
        }


        const hashPassword = await bcrypt.hash(password, 10);

        if (!hashPassword) {
            throw new BadRequestError("Change password failed, please try again");
        }


        const updated = await updatePasswordByEmail({ email, password: hashPassword });

        if (!updated) {
            throw new BadRequestError("Change password failed, please try again");
        }

        const keyToken = await findKeyTokenByUserId(foundUser._id);

        // update refresh token
        const payload = {
            user_id: foundUser._id,
            user_email: foundUser.user_email,
            user_type: foundUser.user_type
        };

        const tokens = await createKeyPair({ payload, publicKey: keyToken.public_key, privateKey: keyToken.private_key });

        if (!tokens) {
            throw new BadRequestError("Please try again");
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

    static async updateStatus({ user_id, user_status, teacher_status }) {
        // check if user is exist
        // check type of user
        // update status
        const foundUser = await findUserById(user_id);

        if (!foundUser) {
            throw new BadRequestError("User not found");
        }


        if (foundUser.user_type === 'teacher' && teacher_status) {
            const updatedStatus = await updateStatusTeacher(user_id, teacher_status);
            if (!updatedStatus) {
                throw new BadRequestError("Update status failed");
            }
            let message;
            let status;
            let logo_status;
            if (teacher_status === 'active') {
                message = "Your account has been activated, thank you for joining us";
                status = "success";
                logo_status = "https://thumbs.dreamstime.com/b/vector-d-check-mark-realistic-icon-trendy-plastic-green-round-starburst-badge-checkmark-approved-white-background-verified-296517716.jpg";
            }
            else if (teacher_status === 'rejected') {
                message = "Information is incorrect, please re-upload information";
                status = "warning";
                logo_status = "https://media.istockphoto.com/id/1407160246/vector/danger-triangle-icon.jpg?s=612x612&w=0&k=20&c=BS5mwULONmoEG9qPnpAxjb6zhVzHYBNOYsc7S5vdzYI="
            }
            else if (teacher_status === 'pedding') {
                message = "Your account has been suspended";
                status = "error";
            }

            // send notification to user
            const noti = await pushNotiForSys({
                type: 'SYS-003',
                receiverId: user_id,
                senderId: "671df08d23841e253cc38506",
                content: message,
                options: {
                    teacher_status,
                    logo_status,
                }
            });

            if (!noti) {
                throw new BadRequestError("Cannot send notification");
            }


            // get list user online by userId
            const listUserOnline = _listUserOnline.filter((item) => item.userId === user_id);
            listUserOnline.forEach((item) => {
                item.socket.emit('notification', noti);
            });

            const tokens = await findExpoTokenByListUserId([user_id]);
            if (tokens.length > 0) {
                await pushNoti({
                    somePushTokens: tokens,
                    data: {
                        body: message,
                        title: 'Thông báo',
                        data: {
                            teacher_status,
                        }
                    }
                });
            }

            return updatedStatus;
        }
        if (user_status) {
            const updatedStatus = await updateStatusUser({ user_id, user_status });
            if (!updatedStatus) {
                throw new BadRequestError("Update status failed");
            }
            return updatedStatus;
        }

    }

    /* ============== V2 ======================== */
    static async signupV2(signupData) {
        // check if email is already used
        const { email, password, fullname } = signupData;
        const foundUser = await findUserByEmailV2(email);

        if (foundUser) {
            throw new BadRequestError("email is already used");
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        if (!hashPassword) {
            throw new InternalServerError("sigup failed!!!");
        }

        // get role id by role name
        const roleUser = await roleModel.findOne({ role_name: 'user' }).lean();

        if (!roleUser) {
            throw new BadRequestError("fail to get role !!!");
        }
        // create user
        const newUser = await userModel.create({
            user_fullname: fullname,
            user_email: email,
            user_password: hashPassword,
            user_role: roleUser._id,
        })

        if (!newUser) {
            throw new BadRequestError("Cannot create user !!!");
        }

        // create key pair for user
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

        return newUser;
    }

    static async loginV2(loginData) {
        const { email, password } = loginData;
        // check if email is already used
        const foundUser = await findUserByEmail(email);
        if (!foundUser) {
            throw new BadRequestError("email is not exist");
        }

        // check if password is correct
        const match = await bcrypt.compare(password, foundUser.user_password);
        if (!match) {
            throw new BadRequestError("password is incorrect");
        }

        // check if user is active
        // if (foundUser.user_status !== "active") {
        //     throw new BadRequestError('account is not active!!!');
        // }

        // create tokens
        const keyToken = await findKeyTokenByUserId(foundUser._id);
        if (!keyToken) {
            throw new BadRequestError("login failed!!!,pls try again");
        }


        const jit = uuidv4();

        // create access token and refresh token
        const payload = {
            user_id: foundUser._id,
            user_email: foundUser.user_email,
            user_role: foundUser.user_role.role_name,
            user_avatar: foundUser.user_avatar,
            jit: jit,
            iat: Math.floor(Date.now() / 1000) // current time in seconds
        }

        const tokens = await createKeyPair({ payload, publicKey: keyToken.public_key, privateKey: keyToken.private_key });

        if (!tokens) {
            throw new BadRequestError("login failed!!!,pls try again");
        }

        return {
            user: {
                fullname: foundUser.user_fullname,
                email: foundUser.user_email,
                user_id: foundUser._id,
                user_role: foundUser.user_role.role_name,
                user_avatar: foundUser.user_avatar,
            },
            tokens: tokens
        }
    }

    static async logoutV2({ user }) {
        const { user_id, jit } = user;
        console.log(user_id, jit);
        // check if user is exist
        const foundUser = await findUserById(user_id);

        if (!foundUser) {
            throw new BadRequestError("user not found!!!");
        }

        // set jit to kvStore
        const setJit = await set(`TOKEN_BLACK_LIST_${user_id}_${jit}`, 1, 60 * 60 * 24 * 2);
        if (!setJit) {
            throw new BadRequestError("logout failed!!!,pls try again");
        }

        return true
    }
}


module.exports = AccessSevice;

