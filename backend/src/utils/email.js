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


export default async function otpVerificationEmail(email, otp) {
  try {
    const transporter = mail();

    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your OTP Code to Verify Account",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333;">🔐 Account Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="background-color: #e0f7fa; padding: 10px; border-radius: 5px; text-align: center; letter-spacing: 2px;">${otp}</h1>
          <p>This OTP is valid for <strong>10 minutes</strong>. Do not share this with anyone.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p>Thanks,<br/><strong>${process.env.APP_NAME} Team</strong></p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    return { error: "Failed to send OTP. Try again later." };
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