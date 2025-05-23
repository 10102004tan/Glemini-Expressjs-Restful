"use strict"

const { OK } = require("../cores/success.response")

const checkAuth = async (req, res, next) => {
    console.log("checkAuth", req.user)
    return new OK({
        message: "Authentication is OK",
        metadata: {
            user: req.user,
        },
    }).send(res)
}

module.exports = {
    checkAuth
}