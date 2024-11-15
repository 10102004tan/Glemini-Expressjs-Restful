'use strict';

const expoTokenModel = require("../expoToken.model");

const findExpoTokenAll = async () => {
    return await expoTokenModel.find({},{tokens:1,_id:0,user_id:1});
};

module.exports = {
    findExpoTokenAll
}