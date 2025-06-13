import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
import { getAllJobApplicant, jobApply } from "../controller/jobApply.contrioller.js";

export const applyJob = Router();
applyJob.route("/job").post(jwtVerify, jobApply);
applyJob.route("/jobApplicant/search").get(jwtVerify , getAllJobApplicant)