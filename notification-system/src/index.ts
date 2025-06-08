/**
 * @file index.ts
 * @description Main entry point for the notification system service.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
"use strict"
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import connect from './rabbitmq/consumer';

app.get('/', (req: Request, res: Response) => {
    res.send('Notification System is running');
})

// connect to MongoDB
import './databases/init.mongodb';
// connect to RabbitMQ and start consuming messages
connect().then(() => {
    console.log('Connected to RabbitMQ and started consuming messages');
}).catch((err) => {
    console.error('Failed to connect to RabbitMQ:', err);
});

export default app;