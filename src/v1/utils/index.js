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

const randomHexColor = () =>{
	return (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

module.exports = {
	HEADER,
	replacePlaceHolder,
	getInfoData,
	randomHexColor
};
