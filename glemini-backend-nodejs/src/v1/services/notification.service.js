'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const NOTI = require('../models/notification.model');
const { getNotificationByReceiverId, updateStatusNotification } = require('../models/repositories/notification.repo');
const userModel = require('../models/user.model');
const { pushNoti } = require('./expo.service');
const { findExpoTokenAllService } = require('./expoToken.service');
const { producerQueue } = require('./producerQueue.service');
const { UserService } = require('./user.service');
const pushNotiForSys = async ({
    type = 'SYS-001',
    receiverId = 1,
    senderId = 1,
    options = {},
    content = ''
}) => {
    const newNoti = await NOTI.create({
        noti_content: content,
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

const getNotificationReceiverIdService = async ({userId,skip,limit}) => {
    console.log('userId',userId);
    return await getNotificationByReceiverId({userId,skip,limit});
}

const updateStatusNotificationService = async({notiId, status}) => {
    const updated = await updateStatusNotification({notiId, status});
    if (!updated) {
        throw new BadRequestError('Update status notification failed');
    }
    return true;
}

const readAll = (userId) => {
    return NOTI.updateMany({noti_receiverId: userId}, {noti_status: 'read'});
};

const sendNotificationAdminService = async ({senderId,type="SYS-001",options={},title="It's working",body="hello world",content})=>{
     const data = {
        title,
        body
    };
    // const listExpoToken = await findExpoTokenAllService();
    // const somePushTokens = [];
   
    // get all user

    const users = await userModel.find({},{_id:1,
      user_fullname:1,
      user_email:1,
    });

    // push notification for all user
    users.forEach(async (user) => {
        const noti = await pushNotiForSys({
            type,
            receiverId: user._id,
            senderId,
            content,
            options
        });

        // get list user online by userId
        const listUserOnline = _listUserOnline.filter((item) => item.userId === user._id.toString());
        if (listUserOnline.length == 0) return;
        listUserOnline.forEach((item) => {
            item.socket.emit('notification', noti);
        });
    });

    return 1;
}


module.exports = {
    pushNotiForSys,
    findNotiByType,
    getNotificationReceiverIdService,
    updateStatusNotificationService,
    sendNotificationAdminService,
    readAll
};