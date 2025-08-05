'use strict';
const { BadRequestError } = require('../cores/error.repsone');
const NOTI = require('../models/notification.model');
const {
  getNotificationByReceiverId,
  updateStatusNotification,
} = require('../models/repositories/notification.repo');
const userModel = require('../models/user.model');
const { pushNoti } = require('./expo.service');
const { findExpoTokenAllService, findAllExpotoken } = require('./expoToken.service');
const MessageService = require("@v1/services/producerQueue.service")
const pushNotiForSys = async ({
  type = 'SYS-001',
  receiverId = 1,
  senderId = 1,
  options = {},
  content = '',
}) => {
  const newNoti = await NOTI.create({
    noti_content: content,
    noti_options: options,
    noti_receiverId: receiverId,
    noti_senderId: senderId,
    noti_type: type,
  });


  // push notification
  /*flow
  1. check if user online
  2. if online, emit notification to user
  3. if offline, push notification to expo token
  4. if not found expo token, do nothing
  */ 
 console.log('receiverId::', receiverId);
 const userFoundInMap = _userSockets[receiverId.toString()];
 console.log('userFoundInMap::', userFoundInMap);
  if (userFoundInMap) {
    console.log('userFoundInMap::', userFoundInMap);
  }else{
    const queueName = 'notifications';
    const message = {
      channels: ['expo'],
      to: receiverId,
      subject: 'Welcome to Glemini',
    }
    await MessageService.producerQueue(queueName,message)
  }

  return newNoti;
};

const createNotification = async ({
  type = 'SYS-001',
  receiverId = 1,
  senderId = 1,
  options = {},
  content = '',
}) => {
  const newNoti = await NOTI.create({
    noti_content: content,
    noti_options: options,
    noti_receiverId: receiverId,
    noti_senderId: senderId,
    noti_type: type,
  });

  // push
  

  return newNoti;
};

const findNotiByType = async (type) => {
  const noti = await NOTI.findOne({
    noti_type: type,
  });
  return noti;
};

const getNotificationReceiverIdService = async ({ userId, skip, limit }) => {
  let result ={
    items: [],
    totalPage:0,
    totalItems: 0,
  }
  const notifications = await getNotificationByReceiverId({
    userId,
    skip,
    limit,
  });

  const totalPage = Math.ceil(notifications.total / limit);
  result.totalPage = totalPage;
  result.totalItems = notifications.length;
  result.items = notifications.listNoti.map((item) => {
    return {
      noti_id: item._id,
      noti_content: item.noti_content,
      noti_options: item.noti_options,
      noti_receiverId: item.noti_receiverId,
      noti_senderId: item.noti_senderId,
      noti_type: item.noti_type,
      noti_status: item.noti_status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
  return result;

};

const updateStatusNotificationService = async ({ notiId, status }) => {
  const updated = await updateStatusNotification({ notiId, status });
  if (!updated) {
    throw new BadRequestError('Update status notification failed');
  }
  return true;
};

const readAll = (userId) => {
  return NOTI.updateMany({ noti_receiverId: userId }, { noti_status: 'read' });
};


const sendNotificationAdminService = async ({
  senderId,
  type = 'SYS-001',
  options = {},
  title = "It's working",
  body = 'hello world',
  content,
}) => {
  const data = {
    title,
    body,
  };
  // const listExpoToken = await findExpoTokenAllService();
  // const somePushTokens = [];

  // get all user

  const users = await userModel.find(
    {},
    {
      _id: 1,
      user_fullname: 1,
      user_email: 1,
    },
  );

  const notifications = users.map(async (user) => {
    const noti = await pushNotiForSys({
      type,
      receiverId: user._id,
      senderId,
      content,
      options,
    });

    const listUserOnline = _listUserOnline.filter((item) => item.userId === user._id.toString());
    listUserOnline.forEach((item) => {
      item.socket.emit('notification', noti);
    });
  });

  await Promise.all(notifications);

  // push notification for all user with expo token
  const tokensExpo = await findAllExpotoken();
  await pushNoti({
    somePushTokens: tokensExpo,
    data: {
      title,
      body,
      url: '/(app)/notification',
      ttl: 60 * 60,
    },
  });
  return 1;
};

module.exports = {
  pushNotiForSys,
  findNotiByType,
  getNotificationReceiverIdService,
  updateStatusNotificationService,
  sendNotificationAdminService,
  readAll,
  createNotification
};
