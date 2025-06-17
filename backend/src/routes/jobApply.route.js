import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
import { allJobApplicationOfParticularUser, deleteJobApplicant, getAllJobApplicant, jobApply, jobMelGayaHaiToCallBandKarDO } from "../controller/jobApply.contrioller.js";

export const applyJob = Router();
applyJob.route("/job").post(jwtVerify, jobApply);
applyJob.route("/jobApplicant/search").get(jwtVerify, getAllJobApplicant)
applyJob.route("/userapplication").get(allJobApplicationOfParticularUser)
applyJob.route("/deleteapplication").delete(jwtVerify, deleteJobApplicant)
applyJob.route('/stopcall').patch(jwtVerify ,jobMelGayaHaiToCallBandKarDO)