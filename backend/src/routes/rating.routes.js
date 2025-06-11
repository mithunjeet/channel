import { Router } from "express";
import { registerRating } from "../controller/rating.controller.js";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
export const ratingRouter = Router();
ratingRouter.route("/rateUser").post(jwtVerify , registerRating)
