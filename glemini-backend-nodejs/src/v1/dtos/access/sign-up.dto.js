"use strict"
const Joi = require('joi')

const signUpDto = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {
    signUpDto
}