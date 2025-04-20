'use strict';

const server = require('./src/v1/app');
const PORT = process.env.PORT || 8000;
const chark = require('chalk');

server.listen(PORT, () => {
	console.log(
		chark.blue.bold("Glemini Backend Server"),
		chark.green.bold("is running on port"), chark.yellow.bold(PORT),
	);
});
