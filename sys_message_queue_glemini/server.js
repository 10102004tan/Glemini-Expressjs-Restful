'use strict';

const expo = require("./src/configs/expo.sdk.config");
const { consumerQueue } = require("./src/services/consumerQueue.service");
const { pushNotiForUser } = require("./src/services/expo.service");
const { default: Expo } = require('expo-server-sdk');


require('./src/dbs/init.mongodb');

const queueName = 'notificationQueue';

consumerQueue(queueName).then(()=>{
    console.log(`Consumer queue success ${queueName}`);
}).catch(console.error);
