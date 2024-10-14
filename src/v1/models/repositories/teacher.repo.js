'use strict';

const teacherModel = require("../teacher.model");

const findImagesVerification = async (user_id) => {
    const foundImages = await teacherModel.findOne({ _id: user_id }, { file_urls: 1, _id: 0 }).lean();
    return foundImages;
};

module.exports = {
    findImagesVerification
}