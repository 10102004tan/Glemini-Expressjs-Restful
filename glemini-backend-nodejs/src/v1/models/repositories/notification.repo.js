'use strict';

const notificationModel = require("../../models/notification.model");

const getNotificationByReceiverId = async ({userId,limit=25}) => {
    return await notificationModel.find({noti_receiverId:userId}).limit(limit).sort({createdAt:-1});
};

module.exports = {
    getNotificationByReceiverId
};