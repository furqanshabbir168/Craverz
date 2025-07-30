import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Craverz" <${process.env.EMAIL_SENDER}>`,
    to,
    subject,
    html
  });
};
