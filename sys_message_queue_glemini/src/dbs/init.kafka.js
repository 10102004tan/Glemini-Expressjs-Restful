'use strict';
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'glemini',
    brokers: ['localhost:9092'],
});

module.exports = kafka;
