'use strict';

const StatusCode = require('../utils/statusCode');
const ReasonStatusCode = require('../utils/reasonPhrases');

class SuccessResponse {
    constructor({message,metadata={},statusCode = StatusCode.OK,reasonStatusCode = ReasonStatusCode.OK}){
        this.message = message ? message : reasonStatusCode;
        this.metadata = metadata;
        this.reasonStatusCode = reasonStatusCode;
        this.statusCode = statusCode;
    }
    send(res,header={}){
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({message,metadata}){
        super({message,metadata});
    }
}

class CREATED extends SuccessResponse {
    constructor({message,metadata,status = StatusCode.CREATED,reasonStatusCode = ReasonStatusCode.CREATED}){
        super({message,metadata,status,reasonStatusCode});
    }
}

module.exports = {
    OK,
    CREATED
};