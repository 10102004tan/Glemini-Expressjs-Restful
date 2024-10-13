'use strict';

const HEADER = {
	AUTHORIZATION: 'authorization',
	REFRESHTOKEN: 'x-refresh-token',
	CLIENT_ID: 'x-client-id',
};

const replacePlaceHolder = (template, params) => {
	Object.keys(params).forEach((key) => {
		template = template.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
	});
};

module.exports = {
	HEADER,
	replacePlaceHolder,
};
