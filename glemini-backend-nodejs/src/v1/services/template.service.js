'use strict';

const Template = require('../models/template.model');
const { BadRequestError } = require('../cores/error.repsone');
const { htmlEmailToken, htmlOTP, htmlWelcome } = require('../utils/tem.html');

class TemplateService {
  static async newTemplate({ tem_name, tem_html }) {
    //1. check exist

    //2. create new template

    const newTemplate = await Template.create({
      tem_name, // unique
      tem_html: htmlWelcome,
    });

    if (!newTemplate) {
      throw new BadRequestError('Cannot create template');
    }

    return newTemplate;
  }

  static async getTemplate({ tem_name }) {
    const template = await Template.findOne({
      tem_name,
    });

    if (!template) {
      throw new BadRequestError('Cannot find template');
    }

    return template;
  }
}

module.exports = TemplateService;
