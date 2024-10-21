'use strict';

const { consumerQueue } = require("./src/services/consumerQueue.service");

const queueName = 'test-queue';

consumerQueue(queueName).then(()=>{
    console.log('Consumer started');
})
.catch(console.error);