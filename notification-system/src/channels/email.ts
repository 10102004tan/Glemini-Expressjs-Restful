/**
 * @file email.ts
 * @description Channel for sending emails using Nodemailer.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
"use strict"
import transporter from '../databases/init.nodemailer';

const send = async (data: {
    subject: string
    body: string
    to: string
}) => {
    try {
        const mailOptions = {
        from: ' "Glemini <glemini.dev@gmai.com>" ',
        to: data.to,
        subject: data.subject,
        html: data.body
      };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

export default {
    send
}