'use strict';

const server = require('./src/app');
const PORT = process.env.PORT || 3000;
const chark = require('chalk');

server.listen(PORT, () => {
  console.log(
    chark.blue.bold('Glemini Backend Server'),
    chark.green.bold('is running on port'),
    chark.yellow.bold(PORT),
  );
});
