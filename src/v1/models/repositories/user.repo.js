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

const updatePasswordByEmail = async ({email, password}) => {
    const updated = await User.updateOne({user_email:email}, {user_password: password});
    return updated;
};

module.exports = {
    findUserByEmail,
    findUserById,
    updatePasswordByEmail
};