/**
 * @file consumer.ts
 * @description RabbitMQ consumer for handling notifications.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
"use strict"

import amqp from 'amqplib';

import email from '../channels/email';
import expo from '../channels/expo';

async function connect() {
    const queue = 'notifications';
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue(queue)

    channel.consume(queue, async (msg:any) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('Received:', data);

      if (data.channels.includes('email')) email.send({
        subject: data.subject,
        body: data.body,
        to: data.to
      }).catch(err => {
        console.error('Failed to send email:', err);
      });
      if (data.channels.includes('expo')) expo.send({
        title: data.subject,
        body: data.body,
        to: data.userId
      }).catch(err => {
        console.error('Failed to send expo notification:', err);
      });

      channel.ack(msg);
    }
  });
}

export default connect;