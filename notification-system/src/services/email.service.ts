/**
 * @file email.service.ts
 * @description
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */

import transporter from '../databases/init.nodemailer';

const EmailService = {
  sendEmail: async ({
    html,
    toEmail,
    subject = "Verify Email",
    text = "",
  }: {
    html: string;
    toEmail: string;
    subject: string;
    text: string;
  }) => {
    try {
      console.log("Sending email to:", html);
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
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log("Error send email", error);
      return error;
    }
  },
};

export default EmailService;
