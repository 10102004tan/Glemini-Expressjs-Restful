'use strict';

const expo = require("./src/configs/expo.sdk.config");
const { consumerQueue } = require("./src/services/consumerQueue.service");
const { pushNotiForUser } = require("./src/services/expo.service");
const { default: Expo } = require('expo-server-sdk');

const queueName = 'notificationQueue';

consumerQueue(queueName).then((data)=>{
    console.log('Data',data);
})
.catch(console.error);