import nodemailer from "nodemailer"
export function mail(){ 
    
   return nodemailer.createTransport({
    host: process.env.SMTP_Host_Name,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSOWORD,
    },
  });   
}


export  default async function otpVerificationEmail(email , otp){ 
  try {
    const transporter = mail();
    await  transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,

      to: email,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

  }catch (emailError) {
    console.error("Email sending failed:", emailError);
    return res.status(500).json({ error: "Failed to send OTP. Try again later." });
  }
}


// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_Host_Name,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSOWORD,
//   },
// });