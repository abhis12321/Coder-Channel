import speakeasy from "speakeasy"
import nodemailer from "nodemailer"

export const sendOTP = async({ email }) => {
    const OTP = createOTP(email)
    await sendOTP2MAIL(email , OTP);
}



const createOTP = (secret) => {
    const OTP = speakeasy.totp({
        secret,
        encoding:"base32",
        step:300, // OTP is valid for 5 minutes(300 secs)
        digits:6,
        algorithm:"sha1",
    })
    return OTP;
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.E_PASS,
    },
  });
  
export async function sendOTP2MAIL(email, OTP) {  
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Your Login OTP.`,
      html: `<p>Hi,</p>
               <p>Please don't share your OTP to anyone</p>
               <h2> ${OTP} </h2>
               `
    };
    return transporter.sendMail(mailOptions);
  }
  
  