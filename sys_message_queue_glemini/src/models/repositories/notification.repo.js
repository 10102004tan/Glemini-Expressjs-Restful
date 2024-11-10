'use strict';

const notificationModel = require("../notification.model");

const getNotificationByReceiverId = async ({userId,limit=25}) => {
    const totalUnread = await notificationModel.countDocuments({noti_receiverId:userId,noti_status:"unread"});
    const listNoti = await notificationModel.find({noti_receiverId:userId}).limit(limit).sort({createdAt:-1});
    return {
        totalUnread,
        listNoti
    }
};

const updateStatusNotification = async ({notiId, status}) => {
    return await notificationModel.updateOne({_id:notiId}, {noti_status:status});
};

module.exports = {
    getNotificationByReceiverId,
    updateStatusNotification
};