// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const { default: helmet } = require('helmet');
// const compression = require('compression');
// const server = require('http').createServer(app);
// const socketService = require('./services/socket.service');
// const errorHandler = require('./middlewares/error.handler');
// const io = require('socket.io')(server,{
// 	cors:{
// 		origin: '*',
// 	},
// });
// global.__basedir = __dirname;
// global._io = io;
// // array list user online global
// global._listUserOnline = [];

// // global map user online
// global._mapUserOnline = new Map();
// global._userSockets = {};
// global._userLast = {};
// global._lastPongAt = Date.now()

// /* MIDDLEWARES START*/
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(require('cors')({
// 	origin:"http://localhost:8000",
// 	credentials: true,
// }));
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(compression());
// /* MIDDLEWARES END*/

// /* DATABASE CONNECTION START*/
// require('./databases/init.mongodb');
// const redis = require('./databases/init.redis');
// redis.initRedis();
// /* DATABASE CONNECTION END*/

// /* SOCKET CONNECTION START*/

// global._io.on('connection', socketService.connection);
// /* SOCKET CONNECTION END*/

// // task scheduler
// // exerciseTask();

// /* ROUTES START*/
// app.use('/', require('./routes'));

// // // catch 404 and forward to error handler
// // app.use((req, res, next) => {
// // 	const error = new Error('Not Found');
// // 	error.status = 404;
// // 	next(error);
// // });

// app.use(errorHandler);
// /* ROUTES END*/

// module.exports = server;
