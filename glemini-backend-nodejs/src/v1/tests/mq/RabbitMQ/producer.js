'use strict';
const amqplib = require('amqplib');
const message = "Hello glemini";

const runProducer = async () => {
    try {
        const connection = await amqplib.connect('amqp://guest:guest@localhost');
        const channel = await connection.createChannel();
        const queueName = 'test-queue';

        await channel.assertQueue(queueName, { durable: true });

        // send message to consumer
        channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);

    } catch (error) {
        console.error(error);
    }
};

runProducer().catch(console.error);