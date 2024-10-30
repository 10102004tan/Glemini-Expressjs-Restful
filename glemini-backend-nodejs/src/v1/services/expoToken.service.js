'use strict';

const expoTokenModel = require("../models/expoToken.model");
const {findExpoTokenAll} = require("../models/repositories/expoToken.repo");


const storeNewExpoToken = async (user_id, token) => {
    // store new expo token
    const expoToken = await expoTokenModel.findOne({
        user_id
    });

    if (expoToken){
        // update tokens
        expoToken.tokens.push(token);
        await expoToken.save();
    }
    else{
        // create new
        await expoTokenModel.create({
            user_id,
            tokens:[token]
        });
    }

    return true;
};


const removeExpoToken = async (user_id, token) => {
    // remove expo token
    const expoToken = await expoTokenModel.findOne({user_id});
    if (expoToken){
        if (expoToken.tokens.length === 1){
            await expoTokenModel.deleteOne({user_id});
        }else{
            const index = expoToken.tokens.indexOf(token);
            if (index > -1){
                expoToken.tokens.splice(index,1);
                await expoToken.save();
            }
        }
    }

    return true;

};



const findExpoTokenAllService = async () => {
    return await findExpoTokenAll();
};

module.exports = {
    storeNewExpoToken,
    removeExpoToken,
    findExpoTokenAllService
};