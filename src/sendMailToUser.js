import nodemailer from "nodemailer";

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
      html: `<p>Hi,</p>
               <p>Please click on the link below to verify your email address.</p>
               <a href="${link}">Verify Email by clicking the bellow link <br/> ${link}</a>
               <p>It will be valid only for 10 minutes, If you fails to verify within the time, your registration will be cancelled. And you have to register again for further process.</p>
               <p>If you did not request this, please ignore this email.</p>`,
    };
  
    return transporter.sendMail(mailOptions);
  }
  
  