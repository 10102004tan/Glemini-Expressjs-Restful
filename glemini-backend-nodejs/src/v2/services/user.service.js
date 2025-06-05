
/**
 * @file user.service.js
 * @module UserService
 * @version 2.0
 * @author 10102004tan
 * @created 2025-6-4
 */

'use strict';

const { NotFoundError } = require("@v1/cores/error.repsone");
const { schoolIsExist } = require("@v1/models/repositories/school.repo");
const { InternalServerError } = require("../../v1/cores/error.repsone");
const UserModel = require("@v1/models/user.model");
const { findUserByIdV3 } = require("../../v1/models/repositories/user.repo");

class UserService {
    /**
     * @description Update user information
     */
    static async update({
        user_id,
        schoolId
    }){

        const isSchoolExit = await schoolIsExist(schoolId);

        if (!isSchoolExit) {
            throw new NotFoundError('school invalid!!!');
        }

        const foundUser = await UserModel.findById(user_id).lean();
        if (!foundUser) {
            throw new NotFoundError('user not found!!!');
        }

        // Update user information
        const updatedUser = await UserModel.findByIdAndUpdate(
            user_id,
            {
                user_schoolIds: [schoolId],
            },
            { new: true }
        ).lean();

        if (!updatedUser) {
            throw new InternalServerError("failed to update")
        }

        return updatedUser;
    }

    /**
     * info
     */

    static async info({ user_id }) {
        const foundUser = await findUserByIdV3({
            id:user_id
        })
        return {
            name: foundUser.user_fullname,
            email: foundUser.user_email,
            phone: foundUser.user_phone,
            school:{
                id: foundUser.user_schoolIds[0]?._id || null,
                name: foundUser.user_schoolIds[0]?.school_name || null,
            }
        }
    }
}

module.exports = UserService;