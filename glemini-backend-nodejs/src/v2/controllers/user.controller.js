/**
 * @file user.controller.js
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-4
 */
'use strict';

const { CREATED } = require('@cores/success.response');
const { OK } = require('@cores/success.response');
const userService = require('@v2/services/user.service');

class UserController {
  /* =================== V2===================== */
  update = async (req, res, next) => {
    return new OK({
      message: 'update user successfully',
      metadata: await userService.update({
        updateData: req.body,
        user_id: req.user.user_id
      })
    }).send(res);
  };
 
}

module.exports = new UserController();
