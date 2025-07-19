import { User } from "../models/user.model.js"
import { mail } from "../utils/email.js";
import { generateotp } from "../utils/otp.js";
import otpVerificationEmail from "../utils/email.js";
import bcrypt from "bcrypt"
import { cloudinaryUpload } from "../utils/cloudinary.upload.js";


const transporter = mail();


const generateAccesTokenAndRefreshToken = async (userid)=>{
  const user = await User.findById(userid)
  const accessToken = user.generateRefreshToken({_id : user._id});
  const refreshToken = user.generateAccesToken({_id :  user._id});
  user.refreshtoken = refreshToken
    
  await user.save({validateBeforeSave : false})
 
  return { accessToken, refreshToken }
  
}

const registerUser = async (req, res, next) => {
  try {

    const { username , email , password , service , state , district } = req.body;
    console.log(username);
    console.log(service)
    console.log(state)
    console.log(district)
    if (!username?.trim() || !email?.trim() || !password?.trim() || !service.trim() || !state || !district ) {
      return res.status(400).json({ error: "Please fill the field correctly" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    // const userExists = await User.findOne({ $or: [{ email }, { username }] });
      const userExists = await User.findOne({email });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }


    const otp = Math.floor(100000 + Math.random() * 800000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    
    const user = await User.create({
      avatar: "",
      coverimage: "",
      username: username.toLowerCase(),
      service,
      state, 
      district,
      email,
      password,
      otp,
      otpExpires,
    });
    
    
  
    try {
      await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,

        to: email,
        subject: "Verify Your Account",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      });

    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).json({ error: "Failed to send OTP. Try again later." });
    }

   res.status(200).json({ message: "OTP sent to email. Verify to complete registration." });

  } catch (error) {
    next(error);
  }
};


const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    console.log("hiiiii");
    console.log(otp)
    console.log(typeof (otp));
    const updatedotp = Number(otp)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("You have typed invalid email");
    if (user.otp !== updatedotp) return res.status(404).json("otp is incorrect");
    console.log(user)
    console.log(user.otp);
     
    if ( new Date() > user.otpExpires) {
        return res.status(404).json("Either OTP is expired or invalid email");
    }

    const token =  await generateAccesTokenAndRefreshToken(user._id);
    console.log(token.refreshToken)
    console.log(token.accessToken)
    user.isverified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.refreshtoken = token.refreshToken;
    await user.save({ validateBeforeSave: false });
    
    const userafterUpdate = await User.findOne({ email }).select({
      password: 0,
    });

        
    res.status(200).json({ message: "Account verified successfully", user: userafterUpdate });

  } catch (error) {
    next(error);
  }
};






const resendotp = async (req, res, next) => {
  
  const {email} = req.body;
  console.log(email);

  try {

    if(!email?.trim()) {
      
      throw new Error("YOU HAVE TYPED WRONG EMAIL PLEASE TYPE A VALID EMAIL");
    }

    // Email validation using a simple regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


    if (!emailPattern.test(email))  throw new Error("PLEASE ENTER A VALID EMAIL ADDRESS");
    

    const user = await User.findOne({ email });
    
    if (!user) {

      throw new Error("UNAUTHORIZED REQUEST. GO AND CREATE ACCOUNT FIRST THEN VERIFY OTP");

    }

    const otp = Math.floor(100000 + Math.random() * 800000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save({validateBeforeSave : false});
   
    try {

      await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Account",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      });

      return res.json({ message : "OTP IS SENT TO YOUR ACCOUNT. CHECK IT OUT" });

    } catch (emailError) {
      console.error("Email sending failed:" , emailError);
      return res.status(500).json({ error : "Failed to send OTP. Try again later." });
    }

  } catch (error) {
    next(error);
  }
}



const login = async (req, res) => { 
  
  const { email , password} = req.body

  if(!email?.trim() || !password.trim())  return res.status(404).json({ message : "please enter a valid  email and password "});
  
  const user = await User.findOne({email});
  if (!user) 
    return res.status(404).json({ message: "user not found  please enter a valid email " })
  // yaha par passord ko bcrypt kar ka chaeck karna hai 
  // abhi ka leya thik hai baad mai dekhata hai 
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Password is wrong. Please enter the valid password",
      success: false,
    });
  }
   
  const otp = generateotp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.otp = otp;
  user.otpExpires = otpExpires;
  
  await user.save({validateBeforeSave : false});
   
 
  try {
  await otpVerificationEmail(email, otp)
  }catch (emailError) {
    console.error("Email sending failed:", emailError)
    return res.status(500).json({ error: "Failed to send OTP. Try again later." })
  }


 res.status(200).json({ message: "OTP sent to email. Verify to compplete." , sucess : true });

}

const forgotpassword = async (req, res, next) => {
  const { email } = req.body

  if (!email?.trim()) return res.status(404).json({error : "please enter valid email"})
 

  try {
    const user = await User.findOne({ email })
    if (!user)
    return res.status(400).json("user not exit  first create  account and then try again")

    const otp = generateotp()
    user.otp = otp
    await user.save({ validateBeforeSave: false })
    await otpVerificationEmail(email, otp)
    return res.status(200).json({ message : "opt is send to your email account complete next step", email: email });
  } catch (error) {
    return res.status(500).json({ error : "error during forgot password reset by from nodemailer.. " })
  }
}


const forgotPasswordOtpVerify = async (req, res) => {
  const { otp, password, email } = req.body

  if (!otp) return res.status(404).json("please enter otp properly")
  if (!email?.trim()) return res.status(404).json("email not from your frontend side its developer fault")
  if (!password?.trim()) return res.status(404).json("password not found")

  const doc = await User.findOne({ email })
  if (!doc) return res.status(404).json("user not exist")

  const duration = (Date.now() - doc.otpExpires) / 1000;

  if (duration > 600) { //  10 minutes
    doc.otpExpires = undefined
    doc.otp = undefined
    await doc.save({ validateBeforeSave: false })
    return res.status(404).json("otp expired, try again...")
  }

  const token = await generateAccesTokenAndRefreshToken(doc._id)

  doc.refreshtoken = token?.refreshToken
  doc.otpExpires = undefined
  doc.isverified = true
  doc.otp = undefined
  doc.password = await bcrypt.hash(password, 10)

  await doc.save({ validateBeforeSave: false })

 
  const updateddoc = await User.findOne({ email }).select('password email')

  if (!updateddoc) return res.status(500).json("something went wrong during process...")

  return res.status(200).json({ message: "login successfully", data: updateddoc })
};
 
 
async function searchuser(req, res) {
  const { user } = req.params;
   console.log("radhe")
  console.log(user);

  if (!user?.trim()) {
    return res.json("query not valid with this name");
  }

  const doc = await User.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: user,
          path: {
            wildcard: "*"
          }
        }
      }
    }
  ]);
  console.log(doc[0])
  if(!doc[0]) return res.json("no user found please try valid")
  return res.json({
    message: "query for user found successfully",
    flag :"user",
    doc: doc
  });
}



const changePassword = async (req, res) => {
  const {password , email} = req.body
  // console.log(req.body)
  if (!password?.trim()) {
    return res.status(404).json("type a valid password")
  }

  if (!email?.trim()) {
    return res.status(404).json("type a valid email")
  }

  const doc = await User.findOne({ _id: req.user._id })

  if (!doc) {
    return res.status(404).json("user not found")
  }
    console.log(doc.email)
  if (doc.email !== email) {
    return res.status(404).json("Your current email is incorrect. You may be trying to change the password of another account.")
  }

  doc.password = await bcrypt.hash(password, 10)
  await doc.save({ validateBeforeSave: false })

  return res.status(200).json("Password has been updated successfully")

}


const uploadAvatar = async (req, res) => {
 console.log("hi from upload avatar controller");

  const localPathOfAvatar = req.file?.path

  if (!localPathOfAvatar) {
    return res.status(404).json({ error: "Local path of avatar not found" });
  }

  const avatarResponseByCloudinary = await cloudinaryUpload(localPathOfAvatar);
  if (!avatarResponseByCloudinary) {
    return res.status(500).json({ error: "error occurred during the upload to Cloudinary" });
  }

  const doc = await User.findById(req.user._id)
  if (!doc) return res.status(401).json({ error: "unauthorized request" })

  doc.avatar = avatarResponseByCloudinary.url
  await doc.save({ validateBeforeSave: false })

  return res.status(200).json("avatar has been uploaded successfully");
}


export {registerUser, verifyOtp , resendotp, login , searchuser, changePassword , uploadAvatar , forgotpassword, forgotPasswordOtpVerify}