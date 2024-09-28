'use strict';
const {CREATED, OK} = require('../cores/success.response');
const accessService = require('../services/access.service');

class AccessController {
    /**
     * @description This is 
     */

    signup = async (req, res, next) => {
        return new CREATED({
            message: "User created successfully",
            metadata: await accessService.signup(req.body)
        }).send(res);
    }

    login = async (req, res, next) => {
        return new OK({
            message: "User LOGIN successfully",
            metadata: await accessService.login(req.body)
        }).send(res);
    }
}

module.exports = new AccessController();