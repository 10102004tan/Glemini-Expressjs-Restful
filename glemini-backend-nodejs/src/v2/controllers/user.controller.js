/**
 * @file user.controller.js
 * @author 10102004tan
 * @version 2.0
 * @since 2025-6-4
 */
'use strict';

const { OK,CREATED } = require('@cores/success.response');
const userService = require('@v2/services/user.service');
const DeviceService = require('@v2/services/device.service');

class UserController {
  /* =================== V2===================== */
  update = async (req, res, next) => {
    console.log("update user", req.body);
    return new OK({
      message: 'update user successfully',
      metadata: await userService.update({
       ...req.body,
        user_id: req.user.user_id
      })
    }).send(res);
  };

  info = async (req, res, next) => {
    return new OK({
      message: 'get user info successfully',
      metadata: await userService.info({ user_id: req.user.user_id })
    }).send(res);
  };


  // store device
  storeDevice = async (req, res, next) => {
    return new OK({
      message: 'store device successfully',
      metadata: await DeviceService.createDevice({
        ...req.body,
        userId: req.user.user_id
      })
    }).send(res);
  };
 
}

module.exports = new UserController();
