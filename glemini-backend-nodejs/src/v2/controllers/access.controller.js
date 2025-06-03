'use strict';

const { CREATED } = require('@cores/success.response');
const { OK } = require('@cores/success.response');
const accessService = require('@v2/services/access.service');
const { validation } = require('@v2/dtos/util');
const { loginDto } = require('@v2/dtos/access/login.dto');
const { signUpDto } = require('@v2/dtos/access/sign-up.dto');

/**
 * @file access.controller.js
 * @description Controller for handling user access operations such as signup, login, logout, and user management.
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-2
 */

class AccessController {
  /* =================== V2===================== */
  signup = async (req, res, next) => {
    return new CREATED({
      message: 'user created successfully',
      metadata: await accessService.signup(validation(signUpDto, req.body)),
    }).send(res);
  };

  login = async (req, res, next) => {
    return new OK({
      message: 'user login successfully',
      metadata: await accessService.login(validation(loginDto, req.body)),
    }).send(res);
  };

  logout = async (req, res, next) => {
    console.log(req.user);
    return new OK({
      message: 'user logout successfully',
      metadata: await accessService.logout({
        user: req.user,
      }),
    }).send(res);
  };

  me = async (req, res, next) => {
    const user = req.user;
    return new OK({
      message: 'user me successfully',
      metadata: await accessService.me({ user }),
    }).send(res);
  };

  /**
   * Create a new teacher
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  createTeacher = async (req, res, next) => {
    console.log('controller:::', req.user);
    return new OK({
      message: 'user created successfully',
      metadata: await accessService.createNewTeacher({
        user_id: req.user.user_id,
        files: req.files,
      }),
    }).send(res);
  };

  updateRoleForUser = async (req, res, next) => {
    return new OK({
      message: 'user role updated successfully',
      metadata: await accessService.updateRoleForUser({
        //    ...req.user,
        ...req.body,
      }),
    }).send(res);
  };
}

module.exports = new AccessController();
