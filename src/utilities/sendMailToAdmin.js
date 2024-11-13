import nodemailer from "nodemailer";
import { contactMessageFromUserToAdmin } from "./message";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.E_PASS,
    },
  });
  
export async function sendMailToAdmin({ name , email , mobile , problem }) {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "Contact request",
      text: `A request is received from contact form`,
      html: contactMessageFromUserToAdmin({ name , email , mobile , problem }),
    };
  
    return transporter.sendMail(mailOptions);
  }
  
  