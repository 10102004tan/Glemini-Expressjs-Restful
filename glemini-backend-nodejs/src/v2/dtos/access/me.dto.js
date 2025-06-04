'use strict';
const Joi = require('joi');

//{ user,device}
const meDto = Joi.object({
    user: Joi.object({
        id: Joi.string().required(),
        email: Joi.string().email().required(),
        fullname: Joi.string().required(),
        avatar: Joi.string().uri().optional(),
        role: Joi.string().valid('user', 'admin','teacher').required(),
    }).required(),
    
    // device: Joi.object({
    //     deviceToken: Joi.string().optional(),
    //     // deviceType: Joi.string().valid('FCM', 'APNs').required(),
    //     deviceName: Joi.string().optional(),
    //     lastLoggedInAt: Joi.date().optional(),
    // }).optional(),
});

module.exports = {
  meDto,
};
