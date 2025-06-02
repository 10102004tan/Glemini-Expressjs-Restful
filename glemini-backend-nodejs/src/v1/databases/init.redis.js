'use strict';

const { createClient } = require('redis');
const chark = require('chalk');

let client = {
    instanceRedis: null, // Instance of Redis client
  },
  statusConnectRedis = {
    CONNECT: 'connect',
    ERROR: 'error',
    END: 'end',
    RECONNECT: 'reconnecting',
  };

const handlerEventConnection = ({ connectionRedis }) => {
  connectionRedis.on(statusConnectRedis.CONNECT, () => {
    console.log(chark.green('Redis connected successfully'));
  });

  connectionRedis.on(statusConnectRedis.ERROR, (err) => {
    console.log(chark.red('Redis connection error: ', err.message));
  });

  connectionRedis.on(statusConnectRedis.END, () => {
    console.log(chark.yellow('Redis connection closed'));
  });

  connectionRedis.on(statusConnectRedis.RECONNECT, () => {
    console.log(chark.blue('Redis reconnecting...'));
  });
};

/**
 * Initialize Redis client and set up event handlers
 * @returns {void}
 */
const initRedis = () => {
  try {
    const instanceRedis = createClient();
    instanceRedis.connect();
    client.instanceRedis = instanceRedis;
    handlerEventConnection({
      connectionRedis: instanceRedis,
    });
  } catch (error) {
    console.log('Error initRedis: ', error);
  }
};

/**
 * Get the Redis client instance
 * @returns {Object} Redis client instance
 */
const getRedis = () => {
  return client;
};

/**
 * Close the Redis client connection
 * @returns {void}
 */
const closeRedis = () => {
  client.instanceRedis.quit();
  client.instanceRedis = null;
};

module.exports = {
  initRedis,
  getRedis,
  closeRedis,
};
