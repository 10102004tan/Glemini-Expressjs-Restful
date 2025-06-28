/**
 * @file init.nodemailer.ts
 * @description Initializes the Nodemailer transporter for sending emails.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
'use strict';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export default transporter;
