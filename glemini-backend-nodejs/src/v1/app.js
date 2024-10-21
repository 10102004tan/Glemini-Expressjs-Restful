'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const server = require('http').createServer(app);
const socketService = require('./services/socket.service');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(server,{
	cors:{
		origin: '*',
	}
});
global.__basedir = __dirname;
global._io = io;

/* MIDDLEWARES START*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
/* MIDDLEWARES END*/

/* DATABASE CONNECTION START*/
require('./databases/init.mongodb');
/* DATABASE CONNECTION END*/

/* SOCKET CONNECTION START*/
global._io.on('connection', socketService.connection);
/* SOCKET CONNECTION END*/

/* ROUTES START*/
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		status: 'error',
		statusCode: statusCode,
		stack: error.stack,
		message: error.message || 'Internal Servel Error',
	});
});
/* ROUTES END*/

module.exports = server;
