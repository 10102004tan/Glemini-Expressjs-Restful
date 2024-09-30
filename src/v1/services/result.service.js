'use strict';
const {BadRequestError} = require('../cores/error.repsone');

class ResultSevice {
    static async single(){
        return {
            quiz: "Đố vui 1",
            score: 10
        }
    }
}

module.exports = ResultSevice;