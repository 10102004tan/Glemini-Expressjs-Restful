'use strict';

const dev = {
	url: 'http://172.16.28.100:8000/api/v1/',
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
