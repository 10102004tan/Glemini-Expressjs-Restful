"use strict"

/**
 * check if the subject is exist
 * @param {string} subjectId
 */

const subjectModel = require('../subject.model')

const subjectIsExit = async (subjectId) => {
    if (!subjectId) return false
    const subject = await subjectModel.findOne({
        _id: subjectId,
    })
    return subject ? true : false
}

/**
 * check list of subjects is exist
 * @param {Array} subjectIds
 */

const subjectsIsExit = async (subjectIds) => {
    for (const subjectId of subjectIds) {
        const isExit = await subjectIsExit(subjectId)
        if (!isExit) return false
    }
    return true
}

module.exports = {
    subjectIsExit,
    subjectsIsExit,
}