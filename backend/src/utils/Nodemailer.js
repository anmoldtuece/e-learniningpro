import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const Sendmail = async function (email, subject, message) {
  if (!email || !subject || !message) {
    return { success: false, error: 'Email, subject, and message are required' };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Gurukul" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, error: 'Failed to send email', details: error.message };
  }
};
