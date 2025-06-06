'use strict';

const amqplib = require('amqplib');
const { pushNotiForUser, pushNoti } = require('../services/expo.service');


const connectToRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect('amqp://guest:guest@localhost');
        if (!connection) {
            throw new Error('Failed to connect to RabbitMQ');
        }
        const channel = await connection.createChannel();

        return { connection, channel };
    } catch (error) {
        console.error(error);
    }
};

const consumerQueue = async (channel,queueName) =>{
    try {
        await channel.assertQueue(queueName, { durable: true });

        // consume message from producer
        channel.consume(queueName, (message) => {
            console.log('Received message: ', message.content.toString());
            const data = JSON.parse(message.content.toString());
            pushNoti(data);
            
        },{
            noAck:true
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to consume message from queue');
    }
}

module.exports = {
    connectToRabbitMQ,
    consumerQueue
};