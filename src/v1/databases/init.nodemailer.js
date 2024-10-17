'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:process.env.NODE_MAILER_EMAIL,
        pass:process.env.NODE_MAILER_PASSWORD
    }
});

module.exports = transporter;