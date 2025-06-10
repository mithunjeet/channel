import { Router } from "express";
import { reportUser } from "../controller/report.controller.js";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
export const reportuser = Router();
reportuser.route("/reportUser").post(jwtVerify , reportUser);