import { Router } from "express";
import { calculateRating,  registerRating } from "../controller/rating.controller.js";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
import { getAllJobApplicant } from "../controller/jobApply.contrioller.js";
export const ratingRouter = Router();
ratingRouter.route("/rateUser").post(jwtVerify, registerRating)
ratingRouter.route("/getRating").post(jwtVerify , calculateRating)
