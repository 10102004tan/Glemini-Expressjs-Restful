'use strict';

const NOTI = require('../models/notification.model');

const pushNotiForSys = async ({
    type='SYS-001',
    receiverId = 1,
    senderId = 1,
    options = {}
})=>{
    let noti_content;

    if (type === 'SYS-001') {
        noti_content = 'You have a new message';
    }else if (type === 'SYS-002') {
        noti_content = 'You have a new friend request';
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

module.exports = {
    pushNotiForSys
};