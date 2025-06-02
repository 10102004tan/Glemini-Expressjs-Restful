'use strict';
const amqplib = require('amqplib');
const message = 'Hello glemini';

const runConsumer = async () => {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'test-queue';

    await channel.assertQueue(queueName, { durable: true });

    // send message to consumer
    channel.consume(
      queueName,
      (message) => {
        console.log(message.content.toString());
      },
      {
        noAck: true,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

runConsumer().catch(console.error);
