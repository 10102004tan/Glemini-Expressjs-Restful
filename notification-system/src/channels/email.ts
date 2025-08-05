/**
 * @file email.ts
 * @description Channel for sending emails using Nodemailer.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
import EmailService from "../services/email.service"

const send = async (data: {
    subject: string
    body: string
    to: string,
    // templateId?: string,
    html?: string
}) => {
    console.log("Sending email with data:", data);
    await EmailService.sendEmail({
        html:data.html || data.body,
        subject:data.subject,
        text:data.subject,
        toEmail:data.to,
    })
}

export default {
    send
}