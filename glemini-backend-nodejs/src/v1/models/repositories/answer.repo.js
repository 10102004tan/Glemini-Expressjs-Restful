/**
 * @file answer.repo.js
 * @description Repository for managing answers in the quiz application.
 * This file contains functions to check if a specific answer or multiple answers exist in the database.
 * @module answer.repo
 */
"use strict"

/**
 * found quiz is not exist
 */
const answerModel = require('../answer.model');

const answerIsExit = async (answerId) => {
    const answer = await answerModel.findById(answerId);
    return answer !== null;
}

/**
 * found answers is not exist
 */

const answersIsExit = async (answerIds) => {
    if (!Array.isArray(answerIds) || answerIds.length === 0) {
        return false;
    }

    const answers = await answerModel.find({ _id: { $in: answerIds } });
    return answers.length === answerIds.length;
}

module.exports = {
    answerIsExit,
    answersIsExit
}
