'use strict';

const { producerQueue, connectToRabbitMQ } = require('../databases/init.rabbitmq');

const messageService = {
  producerQueue: async (queueName, message) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await producerQueue(channel, queueName, message);
    } catch (error) {
      // console.error(error);
      console.log(`Error sending message to queue ${queueName}:`, error.message);
    }
  },
};


module.exports = messageService;
