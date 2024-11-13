import nodemailer from "nodemailer";
import { emailVerificationMessageFromAdminToUser } from "./message";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.E_PASS,
    },
  });
  
export async function sendVerificationEmail(email, token) {
    let hostname = process.env.DOMAIN_LINK;
    const link = `${hostname}/login/${token}?e=${email}`;
  
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Please click on this link to verify your email address:\n${link}\n\nIf you did not request this verification, please ignore this message.`,
      html: emailVerificationMessageFromAdminToUser({ link }),
    };
  
    return transporter.sendMail(mailOptions);
  }
  
  