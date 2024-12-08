'use strict';

const { BadRequestError } = require("../../cores/error.repsone");
const teacherModel = require("../teacher.model");

const findImagesVerification = async (user_id) => {
    const foundImages = await teacherModel.findOne({ _id: user_id }, { file_urls: 1, _id: 0 }).lean();
    return foundImages;
};

const updateStatusTeacher = async (user_id, teacher_status) => {
    try{
        const updatedStatus = await teacherModel.updateOne({ _id: user_id }, { $set: { teacher_status:teacher_status } },{runValidators: true});
        return updatedStatus;
    }catch(err){
        throw new BadRequestError(`${teacher_status} is not a valid status`);
    }
}

const updateImagesVerification = async (user_id, file_urls) => {
    const updatedImages = await teacherModel.updateOne({ _id: user_id }, { $set: { file_urls: file_urls } });
    return updatedImages;
};

const findStatusTeacher = async (user_id) => {
    const foundStatus = await teacherModel.findOne({ _id: user_id }, { teacher_status: 1, _id: 0 }).lean();
    return foundStatus;
};

module.exports = {
    findImagesVerification,
    updateStatusTeacher,
    updateImagesVerification,
    findStatusTeacher
}