import amqp from 'amqplib';

async function publish(data:any) {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

  console.log("Message sent:", data);
  setTimeout(() => conn.close(), 500);
}

publish({
  subject: 'Test Notification',
  body: 'This is a test notification message.',
  to: 'tannguyen.10102004@gmail.com',
  userId:'684119ac7d3098a7bcdffa64',
  channels: ['expo']
});