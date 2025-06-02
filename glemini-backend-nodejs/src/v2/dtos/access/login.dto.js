'use strict';
const Joi = require('joi');

const loginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginDto,
};
