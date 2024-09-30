'use strict';
const {CREATED, OK} = require('../cores/success.response');
const resultService = require('../services/result.service');

class ResultController {
    single = async (req, res) => {
        return new OK({
            message: "doc ket qua thanh cong",
            metadata: await resultService.single(req.body)
        }).send(res);
    }
}

module.exports = new ResultController();