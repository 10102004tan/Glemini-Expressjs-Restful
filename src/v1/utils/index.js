'use strict';
const _ = require('lodash');

const getInfoData = ({fields=[],object={}}) => {
    return _.pick(object,fields);
}

const HEADER = {
	AUTHORIZATION: 'authorization',
	REFRESHTOKEN: 'x-refresh-token',
	CLIENT_ID: 'x-client-id',
};

const replacePlaceHolder = (template, params) => {
	Object.keys(params).forEach((key) => {
		template = template.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
	});
	return template;
};

module.exports = {
	HEADER,
	replacePlaceHolder,
	getInfoData
};
