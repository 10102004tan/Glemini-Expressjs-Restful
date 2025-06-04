'use strict';

/**
 * @file AccessSevice.ts
 * @description Service for handling user access operations such as signup, login, logout, and user management.
 * @module AccessSevice
 * @requires bcrypt
 * @requires crypto
 * @requires uuid
 * @version 2.0
 * @author 10102004tan
 * @license MIT
 */
const { createKeyPair } = require('@v1/auths');
const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} = require('../../v1/cores/error.repsone');

const { findKeyTokenByUserId } = require('@v1/models/repositories/keyToken.repo');
const { updateStatusTeacherV2 } = require('@v1/models/repositories/teacher.repo');
const {
  findUserByEmail,
  findUserByEmailV2,
  findUserById,
} = require('@v1/models/repositories/user.repo');

const roleModel = require('@v1/models/role.model');
const teacherModel = require('@v1/models/teacher.model');
const userModel = require('@v1/models/user.model');

const KeyTokenService = require('@v1/services/keyToken.service');
const { set } = require('@v1/services/redis.service');
const UploadService = require('@v1/services/upload.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const DeviceService = require('./device.service');

class AccessSevice {
  static async signup(signupData) {
    // check if email is already used
    const { email, password, fullname } = signupData;
    const foundUser = await findUserByEmailV2(email);

    if (foundUser) {
      throw new BadRequestError('email is already used');
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    if (!hashPassword) {
      throw new InternalServerError('sigup failed!!!');
    }

    const roleUser = await roleModel.findOne({ role_name: 'user' }).lean();

    if (!roleUser) {
      throw new BadRequestError('fail to get role !!!');
    }
    const newUser = await userModel.create({
      user_fullname: fullname,
      user_email: email,
      user_password: hashPassword,
      user_role: roleUser._id,
    });

    if (!newUser) {
      throw new BadRequestError('Cannot create user !!!');
    }

    // create key pair for user
    const publicKey = await crypto.randomBytes(64).toString('hex');
    const privateKey = await crypto.randomBytes(64).toString('hex');

    //store key pair
    const keyToken = await KeyTokenService.storeKeyToken({
      user_id: newUser._id,
      public_key: publicKey,
      private_key: privateKey,
    });

    if (!keyToken) {
      throw new BadRequestError('Cannot store key token');
    }

    // verify email

    return newUser;
  }

  static async login(loginData) {
    const { email, password } = loginData;
    // check if email is already used
    const foundUser = await findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestError('email is not exist');
    }

    // check if password is correct
    const match = await bcrypt.compare(password, foundUser.user_password);
    if (!match) {
      throw new BadRequestError('password is incorrect');
    }

    const keyToken = await findKeyTokenByUserId(foundUser._id);
    if (!keyToken) {
      throw new BadRequestError('login failed!!!,pls try again');
    }

    const jit = uuidv4();

    // create access token and refresh token
    const payload = {
      user_id: foundUser._id,
      user_email: foundUser.user_email,
      user_role: foundUser.user_role.role_name,
      user_avatar: foundUser.user_avatar,
      user_fullname: foundUser.user_fullname,
      jit: jit,
      iat: Math.floor(Date.now() / 1000), // current time in seconds
    };

    const tokens = await createKeyPair({
      payload,
      publicKey: keyToken.public_key,
      privateKey: keyToken.private_key,
    });

    if (!tokens) {
      throw new BadRequestError('login failed!!!,pls try again');
    }

    if (foundUser.user_role.role_name === 'teacher') {
      const foundTeacher = await teacherModel.findOne({ userId: foundUser._id }).lean();
      return {
        user: {
          fullname: foundUser.user_fullname,
          email: foundUser.user_email,
          user_id: foundUser._id,
          user_role: foundUser.user_role.role_name,
          user_avatar: foundUser.user_avatar,
          status_teacher_verified: foundTeacher ? foundTeacher.status : null,
        },
        tokens: tokens,
      };
    }

    return {
      user: {
        fullname: foundUser.user_fullname,
        email: foundUser.user_email,
        user_id: foundUser._id,
        user_role: foundUser.user_role.role_name,
        user_avatar: foundUser.user_avatar,
      },
      tokens: tokens,
    };
  }

  static async logout({ user,deviceToken}) {
    const { user_id, jit } = user;
    // check if user is exist
    const foundUser = await findUserById(user_id);

    if (!foundUser) {
      throw new BadRequestError('user not found!!!');
    }

    const key = `TOKEN_BLACK_LIST_${user_id}_${jit}`;
    // await set(key, 1, 60 * 60 * 24 * 2); // store for 2 days
    // remove device token
    await DeviceService.deleteDevice({
      userId: user_id,
      deviceToken,
    })
    return true;
  }

  static async me({ user,device}) {
    // get teacher by user_id
    const foundTeacher = await teacherModel.findOne({ userId: user.user_id }).lean();
    if (!foundTeacher) {
      return {
        fullname: user.user_fullname,
        email: user.user_email,
        user_id: user.user_id,
        user_role: user.user_role,
        user_avatar: user.user_avatar,
      };
    }

    // save device token
    // const { deviceToken='', deviceType='', deviceName='' } = device;
    // if (deviceToken && deviceType) {
    //   await DeviceService.createDevice({
    //     userId: user.user_id,
    //     deviceToken,
    //     deviceType,
    //     deviceName,
    //   });
    // }

    return {
      fullname: user.user_fullname,
      email: user.user_email,
      user_id: user.user_id,
      user_role: user.user_role,
      user_avatar: user.user_avatar,
      status_teacher_verified: foundTeacher.status,
    };
  }

  /**
   * create teacher
   */
  static async createNewTeacher({ user_id, files }) {
    // dev
    if (!files) {
      // console.log("files is required");
      // throw new BadRequestError("files is required");

      // find teacher
      const foundTeacher = await teacherModel.findOne({ userId: user_id }).lean();
      if (foundTeacher) {
        if (foundTeacher.status === 'active') {
          throw new BadRequestError('You are already a teacher');
        }
        if (foundTeacher.status === 'pending') {
          throw new BadRequestError('Your request is pending, please wait for approval');
        }
        if (foundTeacher.status === 'deleted') {
          throw new BadRequestError('Your account has been deleted, please contact support');
        }

        // return found teacher
        return foundTeacher;
      }

      const newTeacher = await teacherModel.create({
        userId: user_id,
        attributes: [],
        schools: [],
        status: 'pending',
      });

      return newTeacher;
    }

    const uploadedUrls = await UploadService.uploadMultipleImagesFromFiles({
      files,
      folderName: `glemini/teachers/info/${user_id}`,
    });

    if (!uploadedUrls) {
      throw new BadRequestError('cannot upload images!!!');
    }

    const attributes = uploadedUrls.map((imageUrl) => {
      return {
        name: imageUrl.original_filename,
        url: imageUrl.image_url,
        type: imageUrl.format,
        items: [],
      };
    });

    const newTeacher = await teacherModel.create({
      userId: user_id,
      attributes: attributes,
      schools: [],
      status: 'pending',
    });

    if (!newTeacher) {
      throw new BadRequestError('cannot create teacher!!!');
    }

    return newTeacher;
  }

  static async updateRoleForUser({ user_id, role_name = 'teacher', teacher_status = 'active' }) {
    // update role for user
    const foundUser = await findUserById(user_id);
    if (!foundUser) {
      throw new NotFoundError('not found!');
    }

    // check if role_name is valid
    const foundRole = await roleModel.findOne({ role_name }).lean();
    if (!foundRole) {
      throw new BadRequestError('role invalid!!!');
    }

    // update role for user
    const updatedUser = await userModel
      .findByIdAndUpdate(
        user_id,
        {
          user_role: foundRole._id,
        },
        { new: true },
      )
      .lean();

    if (!updatedUser) {
      throw new BadRequestError('update failed!!!');
    }

    // update status for teacher
    if (foundRole.role_name === 'teacher' && teacher_status) {
      const updatedTeacher = await updateStatusTeacherV2(user_id, teacher_status);
      if (!updatedTeacher) {
        throw new BadRequestError('update failed!!!');
      }
    }

    const socket = _userSockets[user_id];
    if (socket) {
      socket.emit('updateRole', {
        role_name,
        teacher_status,
      });
    }
    return 1;
  }
}

module.exports = AccessSevice;
