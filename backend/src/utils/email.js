import nodemailer from "nodemailer"
export function mail(){ 
    
   return nodemailer.createTransport({
    host: process.env.SMTP_Host_Name,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSOWORD,
    }},
   {
  logger: true,
  debug: true
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



 async function jobInterestEmail(email, obj) {
  try {
    const transporter = mail();

    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: obj?.AlldataofAPplicant[0]?.email, // sending to the job seeker
      subject: `📩 Job Opportunity – Please Contact Me`,
      text: `
Hi ${obj?.AlldataofAPplicant[0]?.username},

I have seen your job application and I am interested in contacting you regarding work.

Details:
👤 Name: ${obj?.AlldataofAPplicant[0]?.username}
📍 Village: ${obj?.village}, District: ${obj?.district}, State: ${obj?.state}
📏 Work Range: ${obj?.workRangeKm} km
💰 Current Wages: ₹${obj?.currentWages}
🎯 Expected Wages: ₹${obj?.expectedWages}
🤝 Commitment: ${obj?.jobcommitment}

Please contact me at my email: ${email}

Thank you,  
Job Provider
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
  <h2 style="color: #333;">📩 Job Opportunity – Please Contact Me</h2>
  <p>Hi <strong>${obj?.AlldataofAPplicant[0]?.username}</strong>,</p>
  <p>I have seen your job application and I’m interested in discussing a work opportunity with you.</p>
  <ul>
    <li><strong>Village:</strong> ${obj?.village}</li>
    <li><strong>District:</strong> ${obj?.district}</li>
    <li><strong>State:</strong> ${obj?.state}</li>
    <li><strong>Work Range:</strong> ${obj?.workRangeKm} km</li>
    <li><strong>Current Wages:</strong> ₹${obj?.currentWages}</li>
    <li><strong>Expected Wages:</strong> ₹${obj?.expectedWages}</li>
    <li><strong>Commitment:</strong> ${obj?.jobcommitment}</li>
  </ul>
  <p><strong>Please contact me at:</strong> <a href="mailto:${email}">${email}</a></p>
  <br/>
  <p>Thanks,<br/>
  <strong>Job Provider</strong></p>
</div>
      `,
    });
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    return { error: "Failed to send job interest email. Try again later." };
  }
}



export { jobInterestEmail }
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_Host_Name,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSOWORD,
//   },
// });