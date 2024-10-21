'use strict';

const { consumerQueue, connectToRabbitMQ } = require("../dbs/init.rabbitmq");

const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const {channel,connection} = await connectToRabbitMQ();
            await consumerQueue(channel,queueName);
            // if error => DLX 
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = messageService;