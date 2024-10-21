'use strict';
const StatusCode = require('../utils/statusCode');
const ReasonStatusCode = require('../utils/reasonPhrases');

class ErrorResponse extends Error {
    constructor(message,status) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST,status = StatusCode.BAD_REQUEST) {
        super(message,status);
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED,status = StatusCode.UNAUTHORIZED) {
        super(message,status);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN,status = StatusCode.FORBIDDEN) {
        super(message,status);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND,status = StatusCode.NOT_FOUND) {
        super(message,status);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message = ReasonStatusCode.INTERNAL_SERVER_ERROR,status = StatusCode.INTERNAL_SERVER_ERROR) {
        super(message,status);
    }
}

module.exports = {
    ErrorResponse,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError
};