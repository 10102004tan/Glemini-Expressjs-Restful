'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const NOTI = require('../models/notification.model');
const { getNotificationByReceiverId, updateStatusNotification } = require('../models/repositories/notification.repo');
const { pushNoti } = require('./expo.service');
const { findExpoTokenAllService } = require('./expoToken.service');
const { producerQueue } = require('./producerQueue.service');
const pushNotiForSys = async ({
    type = 'SYS-001',
    receiverId = 1,
    senderId = 1,
    options = {},
    content = ''
}) => {
    // if (type === 'SYS-001') {
    //     noti_content = 'System maintenance in  @@@'
    // } else if (type === 'SYS-002') {
    //     noti_content = 'Update feature @@@@ in @@@';
    // }
    // else if (type === 'SHARE-001') {
    //     noti_content = 'New share notification from @@@';
    // }
    // else if (type === 'ROOM-001') {
    //     noti_content = 'Bạn được mời tham gia phòng chơi từ @@@';
    // }

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
    const listExpoToken = await findExpoTokenAllService();
    const somePushTokens = [];
    listExpoToken.forEach(async (item) => {
        item.tokens.forEach((token) => {
            somePushTokens.push(token);
        });
        //store notification
        const noti = await pushNotiForSys({
            type,
            receiverId: item.user_id,
            senderId,
            content,
            // options:{
            //     name:'Nguyen Van A',
            //     avatar:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTa0tuaMXvDBuJp2LfEXIpDnOt7-leCVujqUFModBarOPTFQ244',
            //     room_id:'AZXROM'
            // }
        });

        _io.emit(`notification${item.user_id}`,noti);

    });

    pushNoti({somePushTokens,data});

    return 1;
}

module.exports = {
    pushNotiForSys,
    findNotiByType,
    getNotificationReceiverIdService,
    updateStatusNotificationService,
    sendNotificationAdminService
};