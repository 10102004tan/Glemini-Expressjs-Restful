'use strict';

const dev = {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'gleminiDEVDB'
};

const prod = {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || 'gleminiPRODDB'
};

const config = {
    dev,
    prod
};

const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];