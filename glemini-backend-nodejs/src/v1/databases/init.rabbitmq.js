'use strict';

const amqplib = require('amqplib');


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
            console.log(`Received message: ${message.content.toString()}`);
        },{
            noAck:true
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to consume message from queue');
    }
}

const producerQueue = async (channel,queueName,message) =>{
    try {
        await channel.assertQueue(queueName, { durable: true });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),{
           persistent: true,
            contentType: 'application/json'
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send message to queue');
    }
}

module.exports = {
    connectToRabbitMQ,
    consumerQueue,
    producerQueue
};