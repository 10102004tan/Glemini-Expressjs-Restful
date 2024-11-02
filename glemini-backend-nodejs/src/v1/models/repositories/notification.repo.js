'use strict';

const notificationModel = require("../../models/notification.model");

const getNotificationByReceiverId = async ({userId,skip=0,limit=10}) => {
    const totalUnread = await notificationModel.countDocuments({noti_receiverId:userId,noti_status:"unread"});
    const listNoti = await notificationModel.find({noti_receiverId:userId}).skip(skip).limit(limit).sort({createdAt:-1});
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