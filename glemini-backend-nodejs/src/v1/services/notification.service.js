'use strict';
const NOTI = require('../models/notification.model');
const { getNotificationByReceiverId } = require('../models/repositories/notification.repo');
const pushNotiForSys = async ({
    type = 'SYS-001',
    receiverId = 1,
    senderId = 1,
    options = {}
}) => {
    let noti_content;
    if (type === 'SYS-001') {
        noti_content = 'System maintenance in @@@';
    } else if (type === 'SYS-002') {
        noti_content = 'Update feature @@@@ in @@@';
    }
    else if (type === 'SHARE-001') {
        noti_content = 'New share notification from @@@';
    }
    else if (type === 'ROOM-001') {
        noti_content = 'Bạn được mời tham gia phòng chơi từ @@@';
    }

    const newNoti = await NOTI.create({
        noti_content,
        noti_options: options,
        noti_receiverId: receiverId,
        noti_senderId: senderId,
        noti_type: type
    });

    return newNoti;
}

const findNotiByType = async (type) => {
    const noti = await NOTI.findOne({
        noti_type: type
    });
    return noti;
}

const getNotificationReceiverIdService = (userId) => {
    return getNotificationByReceiverId({userId});
}
module.exports = {
    pushNotiForSys,
    findNotiByType,
    getNotificationReceiverIdService
};