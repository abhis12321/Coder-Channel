import nodemailer from "nodemailer";
import { emailVerificationMessageFromAdminToUser } from "./message";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.E_PASS,
    },
  });
  
export async function sendVerificationEmail(email, token, origin) {
    const link = `${origin}/login/${token}?e=${email}`;
  
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email Verification",
      text: "verify your email",
      html: emailVerificationMessageFromAdminToUser({ link }),
    };
  
    return transporter.sendMail(mailOptions);
  }
  
  