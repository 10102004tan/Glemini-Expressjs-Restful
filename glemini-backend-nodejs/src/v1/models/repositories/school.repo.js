"use strict"

const SchoolModel = require('../school.model');

const schoolIsExist = async (schoolId) => {
    const school = await SchoolModel.findById(schoolId).lean();
    return school ? true : false;
}

module.exports = {
    schoolIsExist
}


