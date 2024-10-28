'use strict';

const { producerQueue, connectToRabbitMQ } = require("../databases/init.rabbitmq");


const messageService = {
    producerQueue: async (queueName, message) => {
        try {
            const {channel} = await connectToRabbitMQ();
            await producerQueue(channel,queueName,message);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = messageService;