import { Router } from "express";
// import jwtVerify from "../middleware/jwtVerify.middleware.js";
import { registerUser,  verifyOtp, resendotp, login , searchuser } from "../controller/user.contoller.js";

export  const userRouter = Router();

userRouter.route("/register").post( registerUser)
userRouter.route("/verifyotp").post(verifyOtp);
userRouter.route("/login").post(login);
userRouter.route("/search/:user").get(searchuser)