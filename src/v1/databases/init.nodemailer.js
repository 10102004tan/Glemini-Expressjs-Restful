'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:'',
    port: 465,
    secure:true,
    auth:{
        user:'',
        pass:''
    }
});//36

module.exports = transporter;