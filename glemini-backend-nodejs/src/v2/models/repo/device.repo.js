/**
 * Device Repository Module
 * This module provides the repository for managing device-related operations in the application.
 * @file Answer Repository
 * @module models/repo/device.repo
 * @version 2.0
 */

'use strict';

const DeviceModel = require('@v2/models/device.model');

const createDevice = async ({
    userId,
    deviceToken = '',
    deviceType,
    deviceName = 'unknown',
    lastLoggedInAt = Date.now(),
}) => {

    // find token if exists
    const existingDevice = await findDeviceByToken(deviceToken);

    if (existingDevice) {
        existingDevice.user_id = userId;
        existingDevice.device_type = deviceType;
        existingDevice.device_name = deviceName;
        existingDevice.last_logged_in_at = lastLoggedInAt;

        return await existingDevice.save();
    }

    const device = new DeviceModel({
        user_id: userId,
        device_token: deviceToken,
        device_type: deviceType,
        device_name: deviceName,
        last_logged_in_at: lastLoggedInAt,
    });

    return await device.save();
}

const findDeviceByToken = async (deviceToken) => {
    return await DeviceModel.findOne({
        device_token: deviceToken,
    });
}

const deleteDevice = async ({
    userId,
    deviceToken,
}) => {
    const device = await DeviceModel.findOne({
        user_id:userId,
        device_token: deviceToken,
    });

    if (!device) {
        return null;
    }

    return await device.delete();
}

const findTokensByUserId = async (userId) => {
    return await DeviceModel.find({
        user_id: userId,
    }).select('device_token');
}

module.exports = {
    createDevice,
    findDeviceByToken,
    deleteDevice,
    findTokensByUserId
};