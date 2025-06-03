'use strict';
const crypto = require('crypto');
const OTPService = require('./otp.service');
const TemplateService = require('./template.service');

const transporter = require('../databases/init.nodemailer');
const { NotFoundError } = require('../cores/error.repsone');
const { replacePlaceHolder } = require('../utils');

class EmailService {
  static async sendEmailToken({ email }) {
    try {
      //1. get token
      const token = await OTPService.newOTP(email);
      //2. get email template
      const template = await TemplateService.getTemplate({
        tem_name: 'HTML_EMAIL_TOKEN',
      });

      if (!template) {
        throw new NotFoundError('Template not found');
      }

      //3. replace token to template
      const content = replacePlaceHolder(template.tem_html, {
        link_verify: `http://localhost:3000/verify-email?token=${token}`,
      });

      //4. send email use send email amazon, sendgrid, mailgun
      this.sendEmailLinkVerification({
        html: content,
        toEmail: email,
        subject: 'Verify Email',
      }).catch(console.error);

      return 1;
    } catch (error) {}
  }

  static async sendEmailLinkVerification({
    html,
    toEmail,
    subject = 'Verify Email',
    text = 'Verify Email',
  }) {
    try {
      const mailOptions = {
        from: ' "Glemini <glemini.dev@gmai.com>" ',
        to: toEmail,
        subject: subject,
        text: text,
        html: html,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.log('Error send email', error);
      return error;
    }
  }

  static async sendEmailOTP({ email, name }) {
    try {
      const token = await OTPService.newOTP(email);
      const template = await TemplateService.getTemplate({
        tem_name: 'HTML_EMAIL_OTP',
      });

      if (!template) {
        throw new NotFoundError('Template not found');
      }

      const content = replacePlaceHolder(template.tem_html, {
        otp: token.otp_token,
        name,
      });

      this.sendEmailLinkVerification({
        html: content,
        toEmail: email,
        subject: 'Forget Password',
      }).catch(console.error);

      return 1;
    } catch (error) {
      console.log('Error send email', error);
    }
  }

  static async sendEmailWelcome({ email }) {
    try {
      const template = await TemplateService.getTemplate({
        tem_name: 'HTML_EMAIL_WELCOME',
      });

      if (!template) {
        throw new NotFoundError('Template not found');
      }

      this.sendEmailLinkVerification({
        html: template.tem_html,
        toEmail: email,
        subject: 'Welcome to Glemini',
      }).catch(console.error);

      return 1;
    } catch (error) {
      console.log('Error send email', error);
    }
  }
}

module.exports = EmailService;
