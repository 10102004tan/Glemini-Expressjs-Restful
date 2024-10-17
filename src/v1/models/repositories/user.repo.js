'use strict';

const User = require('../../models/user.model');
const Teacher = require('../../models/teacher.model');
const { BadRequestError } = require('../../cores/error.repsone');

const findUserByEmail = async (email) => {
    const foundUser = await User.findOne({ user_email: email }).lean();
    return foundUser;
};

const findUserByEmailV2 = async (email) => {
    const foundUser = await User.findOne({ user_email: email }).lean();
    if (!foundUser) return;
    const teacherStatus = await Teacher.findOne({_id:foundUser._id},{teacher_status:1,_id:0}).lean();
    return (foundUser.user_type==="teacher") ? { ...foundUser, teacher_status:teacherStatus.teacher_status} : foundUser;
};

const findUserById = async (id) => {
    const foundUser = await User.findById(id).lean();
    return foundUser;
};

const findUserByIdV2 = async ({id,select={}}) => {
    const foundUser = await User.findById(id,select).lean();
    return foundUser;
};

const updatePasswordByEmail = async ({email, password}) => {
    const updated = await User.updateOne({user_email:email}, {user_password: password});
    return updated;
};

const findStatusByUserId= async ({id,type}) => {
    console.log(id);
    const statusFound = await User.findOne({_id:id});
    if(type === 'teacher'){
       const statusTeacher = await Teacher.findById(id);
       return {
              user_status: statusFound.user_status,
              teacher_status: statusTeacher.teacher_status
       }
    }
    return {
        user_status: statusFound.user_status
    }
};

const findAndUpdateUserById = async ({id,user_fullname,user_email,user_avatar}) => {
    //  find email
    if (user_email) {
        const found = await User.findOne({ user_email}).lean();
        if(found) throw new BadRequestError("Email already exists");
    }
    const updateData = {user_fullname};
    if(user_email) updateData.user_email = user_email;
    if(user_avatar) updateData.user_avatar = user_avatar;
    const updated = await User.updateOne({_id:id}, updateData);
    return updated;
};


const updateStatusUser = async ({user_id, user_status}) => {
    const updatedStatus = await User.updateOne({ _id: user_id }, { $set: { user_status } });
    return updatedStatus;
}

module.exports = {
    findUserByEmail,
    findUserById,
    updatePasswordByEmail,
    findStatusByUserId,
    findUserByEmailV2,
    findUserByIdV2,
    findAndUpdateUserById,
    updateStatusUser
};