'use strict';

const { OK } = require("../cores/success.response");
const TemplateService = require("../services/template.service");

class TemplateController {
    createTemplate = async(req,res,next)=>{
        return new OK({
            message: "Create template success",
            metadata:await TemplateService.newTemplate({tem_name:'HTML_EMAIL_WELCOME'})
        }).send(res);
    }
}

module.exports = new TemplateController();