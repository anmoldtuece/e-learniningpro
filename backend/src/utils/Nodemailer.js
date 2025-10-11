// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const Sendmail = async function (email, subject, message) {
//   if (!email || !subject || !message) {
//     return { success: false, error: 'Email, subject, and message are required' };
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Gurukul" <${process.env.SMTP_EMAIL}>`,
//     to: email,
//     subject: subject,
//     html: message,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return { success: true, message: 'Email sent successfully' };
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     return { success: false, error: 'Failed to send email', details: error.message };
//   }
// };

import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend('re_DwC3BJYL_GzpvcEuJspAUqpLJN5obBVA5');

export const Sendmail = async function (email, subject, message) {
  if (!email || !subject || !message) {
    return { success: false, error: "Email, subject, and message are required" };
  }

  try {
    const data = await resend.emails.send({
      from: `Your App <onboarding@resend.dev>`, // e.g. "Gurukul <onboarding@resend.dev>"
      to: email,
      subject: subject,
      html: message,
    });

    console.log("Email sent:", data);
    return { success: true, message: "Email sent successfully", data };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: "Failed to send email", details: error.message };
  }
};

