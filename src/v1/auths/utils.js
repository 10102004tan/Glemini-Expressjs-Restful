'use strict';

const asynHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

module.exports = {
    asynHandler
};