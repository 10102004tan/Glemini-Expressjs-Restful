'use strict';
const Joi = require('joi');

const rolePermissionSchema = Joi.object({
  resource: Joi.string().required(),
  actions: Joi.string().required(),
  attributes: Joi.string().default('*'),
});

const createRoleDto = Joi.object({
  role_name: Joi.string().required(),
  role_description: Joi.string().optional(),
  role_permissions: Joi.array().items(rolePermissionSchema).required(),
});

module.exports = {
  createRoleDto,
};
