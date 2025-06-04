'use strict';

const dev = {
  host: process.env.DEV_DB_HOST || 'localhost',
  port: process.env.DEV_DB_PORT || 27017,
  name: process.env.DEV_DB_NAME || 'gleminiDEVDB',
  pass:process.env.DEV_DB_PASS || '',
  username: process.env.DEV_DB_USERNAME || '',
};

const prod = {
  host: process.env.PROD_DB_HOST || 'localhost',
  port: process.env.PROD_DB_PORT || '',
  name: process.env.PROD_DB_NAME || 'gleminiPRODDB',
  pass: process.env.PROD_DB_PASS || '',
  username: process.env.PROD_DB_USERNAME || '',
};

const config = {
  dev,
  prod,
};

const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
