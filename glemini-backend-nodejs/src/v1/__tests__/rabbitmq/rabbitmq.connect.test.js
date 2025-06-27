const { connectToRabbitMQ } = require('../../databases/init.rabbitmq');

describe('RabbitMQ Connection', () => {
  it('should connect to RabbitMQ and return connection and channel', async () => {
    const result = await connectToRabbitMQ();
    expect(result).toHaveProperty('connection');
    expect(result).toHaveProperty('channel');
    // Đóng kết nối sau khi test
    await result.channel.close();
    await result.connection.close();
  },10000); 
});