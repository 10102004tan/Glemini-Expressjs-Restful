'use strict';
const {CREATED, OK} = require('../cores/success.response');
const resultService = require('../services/result.service');

class ResultController {

    // signup = async (req, res, next) => {
    //     return new CREATED({
    //         message: "User created successfully",
    //         metadata: await accessService.signup(req.body)
    //     }).send(res);
    // }

    single = async (req, res, next) => {
        return new OK({
            message: "success",
            data: await resultService.single(req.body)
        }).send(res);
    }
}

module.exports = new ResultController();