'use strict';

const expoTokenModel = require("../models/expoToken.model");
const {findExpoTokenAll} = require("../models/repositories/expoToken.repo");


const storeNewExpoToken = async (user_id, token) => {
    // store new expo token
    await expoTokenModel.create({
        user_id,
        token
    });

    return true;
};


const removeExpoToken = async (user_id, token) => {
    // remove expo token
    await expoTokenModel.deleteOne({
        user_id,
        token
    });

    return true;

};



const findExpoTokenAllService = async () => {
    return await findExpoTokenAll();
};

const findExpoTokenByListUserId = async (userIds) => {
    // find expo token by list user id, token not null, return only token
    const tokens =  await expoTokenModel.find({
        user_id: {$in: userIds},
        token: {$ne: '',$exists:true}
    },{
        token:1,_id:0
    }).lean();

    return tokens.map(token => token.token);
};

module.exports = {
    storeNewExpoToken,
    removeExpoToken,
    findExpoTokenAllService,
    findExpoTokenByListUserId
};