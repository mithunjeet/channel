// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "95a75f8fd7be5c",
      pass: "bd52784345d522"
    }
});
  

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

// Temporary storage for OTPs (use Redis or a database in production)
const otpStore = {};

// Nodemailer transporter using Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "95a75f8fd7be5c",
    pass: "xhdbfryt444",
  },
});

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// **1. API to Send OTP**
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  otpStore[email] = { otp , expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 minutes

  const mailOptions = {
    from: "no-reply@yourdomain.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your One-Time Password (OTP) is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
      
      res.status(500).json({ message: "Error sending OTP", error });
      
  }
});

// **2. API to Verify OTP**
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const storedOTP = otpStore[email];
  if (!storedOTP) return res.status(400).json({ message: "OTP expired or not requested" });

  if (storedOTP.otp === otp && storedOTP.expiresAt > Date.now()) {
    delete otpStore[email]; // OTP used, remove it
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid or expired OTP" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  