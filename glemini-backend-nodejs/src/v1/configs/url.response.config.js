'use strict';

const dev = {
  url: 'http://192.168.247.116:3000/api/v1/',
};

const prod = {
  url: 'http://domain:port/api/v1/',
};

const config = {
  dev,
  prod,
};

const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
