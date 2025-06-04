/**
 * @file Device Service
 * @description This file contains the Device Service which handles operations related to user devices.
 * @version 2.0
 * @author 10102004tan
 * @license MIT
 */

'use strict';
const {createDevice} = require('@v2/models/repo/device.repo');
const {
  InternalServerError,
} = require('@v1/cores/error.repsone');
const { findTokensByUserId } = require('@v2/models/repo/device.repo');

class DeviceService {
    /**
     * Creates a new device for a user.
     * @param {Object} deviceData - The data for the new device.
     */
    static async createDevice(deviceData) {
      const { userId, deviceToken = '', deviceType, deviceName = 'unknown', lastLoggedInAt = Date.now() } = deviceData;
      const deviceStore = await createDevice({
        userId,
        deviceToken,
        deviceType,
        deviceName,
        lastLoggedInAt
      });

        if (!deviceStore) {
            InternalServerError("failed!!!")
        }
    return deviceStore;
    }

    /**
     * Deletes a device for a user.
     * @param {Object} deviceData - The data for the device to be deleted.
     */
    static async deleteDevice(deviceData) {
      const { userId, deviceToken } = deviceData;
      return await deleteDevice({
        user_id: userId,
        deviceToken
      });
    }

    /**
     * find all token by user id
     */
    static async findAllTokenByUserId(userId) {
      const tokens = await findTokensByUserId(userId);
      return tokens.map(token => token.device_token);
    }
}

module.exports = DeviceService;