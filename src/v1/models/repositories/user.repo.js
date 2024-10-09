'use strict';

const User = require('../../models/user.model');
const Teacher = require('../../models/teacher.model');

const findUserByEmail = async (email) => {
    const foundUser = await User.findOne({ user_email: email }).lean();
    return foundUser;
};

const findUserByEmailV2 = async (email) => {
    const foundUser = await User.findOne({ user_email: email }).lean();
    const teacherStatus = await Teacher.findOne({_id:foundUser._id},{teacher_status:1,_id:0}).lean();
    console.log(foundUser.user_type);
    return (foundUser.user_type==="teacher") ? { ...foundUser, teacher_status:teacherStatus.teacher_status} : foundUser;
};

const findUserById = async (id) => {
    const foundUser = await User.findById(id);
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

module.exports = {
    findUserByEmail,
    findUserById,
    updatePasswordByEmail,
    findStatusByUserId,
    findUserByEmailV2
};