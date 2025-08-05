"use strict";

const Joi = require('joi');

const createQuizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  subject_ids: Joi.array().items(Joi.string().optional()).default([]),
  status: Joi.string().valid('draft', 'published','unpublished').default('unpublished'),
});

module.exports = {
    createQuizSchema,
};
