'use strict';

const { BadRequestError } = require('../../v1/cores/error.repsone');

const validation = (schema, payload) => {
  const { error } = schema.validate(payload);
  if (error) {
    throw new BadRequestError('Invalid request ' + error.details[0].message);
  }
  return payload;
};

module.exports = {
  validation,
};
