'use strict';

const { consumerQueue, connectToRabbitMQ } = require("../dbs/init.rabbitmq");



const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const {channel,connection} = await connectToRabbitMQ();
            return await consumerQueue(channel,queueName);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = messageService;