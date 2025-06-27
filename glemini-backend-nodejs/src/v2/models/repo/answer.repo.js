/**
 * Answer Repository
 * This module provides functions to interact with the answer data in the database.
 * @file answer.repo.js
 * @module models/repo/answer.repo
 * @version 2.0
 */

"use strict";
const AnswerModal = require("@v1/models/answer.model");

const findAnswerById = async (id,select={
    _id: 1,
    text: 1
}) => {
    const answerFound = await AnswerModal.findOne({
        _id: id,
    }).select(select).lean();
    return answerFound;
}

const findAnswersByIds = async (ids, select = {
    _id: 1,
    text: 1
}) => {
    const answersFound = await AnswerModal.find({
        _id: { $in: ids },
    }).select(select).lean();
    return answersFound;
}

const isAnswersExit = async (ids) => {
    const answersFound = await AnswerModal.find({
        _id: { $in: ids },
    }).select({ _id: 1 }).lean();
    return answersFound.length === ids.length;
}

module.exports = {
    findAnswerById,
    findAnswersByIds,
    isAnswersExit
}
