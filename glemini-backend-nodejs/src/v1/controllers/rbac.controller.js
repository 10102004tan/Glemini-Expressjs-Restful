'use strict';
const { CREATED } = require('../cores/success.response');
const { createRoleDto } = require('../dtos/rbac/create-role.dto');
const { validation } = require('../dtos/util');
const RbacService = require('../services/rbac.service');

class RbacController {
  /**
   * @description create new resource for role
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async createRole(req, res, next) {
    return new CREATED({
      message: 'create role success',
      metadata: await RbacService.newRole(validation(createRoleDto, req.body)),
    }).send(res);
  }

  /**
   * @description create new resource for role
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */

  async createResource(req, res, next) {
    return new CREATED({
      message: 'create resource success',
      metadata: await RbacService.createResource(req.body),
    }).send(res);
  }
}

module.exports = new RbacController();
