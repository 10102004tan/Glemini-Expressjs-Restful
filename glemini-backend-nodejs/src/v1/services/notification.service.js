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

const getNotificationReceiverIdService = ({userId,skip,limit}) => {
    return getNotificationByReceiverId({userId,skip,limit});
}

const updateStatusNotificationService = async({notiId, status}) => {
    const updated = await updateStatusNotification({notiId, status});
    if (!updated) {
        throw new BadRequestError('Update status notification failed');
    }
    return true;
}

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

        // push realtime notification for all user online
        const userOnline = _listUserOnline.find((userOnline) => userOnline.userId === user._id.toString());
        if (!userOnline) return;
        userOnline.socket.emit('notification', noti);
    });


    // pushNoti({somePushTokens,data});

    return 1;
}


module.exports = {
    pushNotiForSys,
    findNotiByType,
    getNotificationReceiverIdService,
    updateStatusNotificationService,
    sendNotificationAdminService,
};