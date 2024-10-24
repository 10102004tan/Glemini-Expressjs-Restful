'use strict';

const { BadRequestError } = require('../cores/error.repsone');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const userConfig = require('../utils/userConfig');
const { OK } = require('../utils/statusCode');
const { uploadDisk } = require('../configs/multer.config');
const { findUserByIdV2, findUserById, findAndUpdateUserById } = require('../models/repositories/user.repo');
const { findImagesVerification } = require('../models/repositories/teacher.repo');
const UploadService = require('./upload.service');

class UserFactory {
    static createUser(type, payload) {
        console.log(type);
        switch (type) {
            case "student":
                return new StudentService(payload).createUser();
            case "teacher":
                return new TeacherService(payload).createUser();
            default:
                throw new BadRequestError("User type is invalid");
        }
    }

    // get status 
}

class UserService {

    constructor({
        user_fullname,
        user_email,
        user_password,
        user_type,
        user_phone,
        user_avatar,
        user_status = 'active',
        user_attributes = {}
    }) {
        this.user_fullname = user_fullname;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_type = user_type;
        this.user_phone = user_phone;
        this.user_avatar = user_avatar;
        this.user_status = user_status;
        this.user_attributes = user_attributes;
    }

    async createUser(user_id) {
        const newUser = await User.create({
            ...this,
            _id: user_id
        });

        if (!newUser) {
            throw new BadRequestError("Cannot create user");
        }

        return newUser;
    }

    static async profile({ user_id }) {
        const user = await findUserByIdV2({ id: user_id, select: { user_fullname: 1, user_email: 1 } });

        if (!user) {
            throw new BadRequestError("User not found");
        }

        return user;
    }

    static async updateProfile({ user_id, fullname, email, avatar }) {
        // update full name,email,avatar
        console.log(fullname);
        let uploadUrl = null;
        if (avatar) {
            uploadUrl = await UploadService.uploadImageFromOneFile({
                path: avatar,
                folderName: `users/${user_id}/avatars`
            });

            if (!uploadUrl) {
                throw new BadRequestError("Cannot upload avatar");
            }
        }

        const updated = await findAndUpdateUserById({ id: user_id, user_fullname: fullname, user_email: email, user_avatar: (uploadUrl && uploadUrl.thumbnail) });
        if (!updated) {
            throw new BadRequestError("Cannot update user");
        }
        return {
            user_fullname: fullname,
            user_email: email,
            user_avatar: (uploadUrl && uploadUrl.thumbnail)
        };
    }


}

class StudentService extends UserService {
    //TODO: 
    // 1. create student
    // 2.create user
    async createUser() {
        console.log(`attributes::` + this.user_attributes);
        const newStudent = await Student.create({
            ...this.user_attributes
        });

        if (!newStudent) {
            throw new BadRequestError("Cannot create user");
        }

        const newUser = await super.createUser(newStudent._id);

        if (!newUser) {
            throw new BadRequestError("Cannot create user");
        }

        return newUser;
    }
}

class TeacherService extends UserService {
    async createUser() {

        //TODO: upload file_url to /uploads
        // uploadDisk.single()

        const newTeacher = await Teacher.create({
            ...this.user_attributes
        });

        if (!newTeacher) {
            throw new BadRequestError("Cannot create user");
        }

        const newUser = await super.createUser(newTeacher._id);

        if (!newUser) {
            throw new BadRequestError("Cannot create user");
        }

        return newUser;
    }

    static async getImagesVerification({ user_id }) {
        const images = await findImagesVerification(user_id);
        if (!images) {
            throw new BadRequestError("User not found");
        }
        return images;
    }

    // update files teacher
    static async updateFilesTeacher({ user_id, file_urls }) {
        console.log(file_urls);
        return 1;
    }
}


const newUser = async ({
    email = null,
    captcha = null
}) => {
    // 1. check email
    const foundUser = await User.findOne({
        user_email: email
    }).lean(); // doi voi he thong lon thi se luu len redis

    //2. if exists
    if (foundUser) {
        throw new BadRequestError("Email is already exists");
    }

    //3. send email

    return new OK({
        message: "Send email success",
        metadata: {
            token
        }

    })
}

module.exports = {
    UserFactory,
    newUser,
    UserService,
    TeacherService,
};