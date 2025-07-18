import { Router } from "express";
// import jwtVerify from "../middleware/jwtVerify.middleware.js";
import { registerUser,  verifyOtp, resendotp, login , searchuser, changePassword , uploadAvatar } from "../controller/user.contoller.js";
import { upload } from "../middleware/multer.js";
import jwtVerify from "../middleware/jwtVerify.middleware.js";

export  const userRouter = Router();

userRouter.route("/register").post( registerUser)
userRouter.route("/verifyotp").post(verifyOtp);
userRouter.route("/login").post(login);
userRouter.route("/search/:user").get(searchuser)
userRouter.route("/changePassword").patch(jwtVerify, changePassword)
userRouter.route("/uploadAvatar").post(
  upload.single("avatar"),
  jwtVerify,
  uploadAvatar
);

