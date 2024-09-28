'use strict';
const {CREATED} = require('../cores/success.response');
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
}

module.exports = new AccessController();