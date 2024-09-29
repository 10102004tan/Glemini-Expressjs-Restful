'use strict';

const User = require('../../models/user.model');

const findUserByEmail = async (email) => {
    const foundUser = await User.findOne({ user_email: email });
    return foundUser;
};

const findUserById = async (id) => {
    const foundUser = await User.findById(id);
    return foundUser;
};

module.exports = {
    findUserByEmail,
    findUserById
};