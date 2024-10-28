const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'glemini',
  brokers: ['localhost:9092'],
})

const runProducer = async () => {
    const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()
}

runProducer().catch(console.error)
