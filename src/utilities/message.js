export const contactMessageFromUserToAdmin = ({ name , email , mobile , problem }) => {
    return `   <p>Name : ${name}</p>
               <p>Email : ${email}</p>
               <p>Phone No. : ${mobile}</p>
               <p>Problem : ${problem}</p>`
}

export const emailVerificationMessageFromAdminToUser = ({ link }) => {
    return `<p>Hi,</p>
               <p>Please click on the link below to verify your email address.</p>
               <a href="${link}">Verify Email by clicking the bellow link <br/> ${link}</a>
               <p>It will be valid only for 10 minutes, If you fails to verify within the time, your registration will be cancelled. And you have to register again for further process.</p>
               <p>If you did not request this, please ignore this email.</p>`
}


export const forgotPasswordMessage = ({ pass }) => {
    return `<p>Hi,</p>
               <p>Please use the Password below to login with your email address.</p>
               <h3>password is:  <h1> ${pass}</h1></h3>
               <p>If you did not request this, please ignore this email.</p>`
}