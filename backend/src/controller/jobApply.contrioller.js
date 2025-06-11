import mongoose from "mongoose";
import { JobApply } from "../models/jobapply.model.js";

export const jobApply = async (req, res) => {
  try {
      const { role, jobcommitment, village, state, district, workRangeKm, currentWages,  expectedWages } = req.body;
    for (const [key, value] of Object.entries(req.body)) { 
        console.log(key , value)
    }
    //   for (let [key, value] of Object.entries(req.body)) {
    //      console.log(key , typeof(value))
    // }
    if (!role?.trim() ||!village?.trim() || !state?.trim() || !district?.trim() || !jobcommitment?.trim() || !currentWages.trim() || !workRangeKm.trim() || !expectedWages.trim()) {
       return res.status(400).json("Please fill all fields properly");
    }
    
  for (const [key, value] of Object.entries(req.body)) {
  if (typeof value === "string" && !isNaN(value.trim())) {
    if (Number(value) <= 0) {
      return res.status(404).json(`This field cannot be negative or zero: ${key}`);
    }
  }
}

  
    
    
    
    const jobapplied = await JobApply.create({
      role: role.toLowerCase(),
      village: village.toLowerCase(),
      state: state.toLowerCase(),
      district: district.toLowerCase(),
      jobcommitment: jobcommitment.toLowerCase(),
      workRangeKm: Number(workRangeKm),
      expectedWages: Number(expectedWages),
      currentWages: Number(currentWages),
      owner: new mongoose.Types.ObjectId(req.user._id)
    });

    if (!jobapplied) {
      return res.status(500).json("Job application failed. Something went wrong");
    }

    return res.status(200).json("Job applied successfully. Have a nice day!");
  } catch (err){
    console.error("Job Apply Error:", err);
    return res.status(500).json("Internal Server Error");
  }
};

  