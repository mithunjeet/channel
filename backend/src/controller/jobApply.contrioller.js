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


export const getAllJobApplicant = async (req, res) => {
  const { village, state, district, role } = req.query;

  console.log(req.query);

  try {

    if (!village?.trim() || !state?.trim() || !district?.trim()) {
      return res.status(404).json(" all fields  are required");
    }

    const arr = [
      {
        text: {
          query: village,
          path: "village",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 0,
            maxExpansions: 50
          }
        }
      }
    ];

    if (role?.trim()) {
      shouldConditions.push({
        text: {
          query: role,
          path: "role"
        }
      });
    }

    const data = await JobApply.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            must: [
              {
                text: {
                  query: state,
                  path: "state"
                }
              },
              {
                text: {
                  query: district,
                  path: "district"
                }
              }
            ],
            should: arr
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "AlldataofAPplicant"
        }
      }
    ]);

    return res.status(200).json(data);
  } catch (error) {
    
    return res.status(500).json("internal server error! something went wrong during search.");
  }
};


//1. Use MongoDB Atlas Full-Text Search (with Fuzzy Matching)
// If you're using MongoDB Atlas, it supports full-text search with fuzzy matching using Lucene under the hood.

export const allJobApplicationOfParticularUser = async (req, res) => {
   console.log(req?.user?._id)
  if (!req?.user?._id) {
    return res.status(401).json({ message: "Unauthorized User ID missing" });
  }

  try {
    const userAllApplication = await JobApply.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(req.user._id),
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "alldetails",
        }
      },
    ]);

    return res.status(200).json(userAllApplication);
  } catch (error) {
    console.error("Error in allJobApplicationOfParticularUser:", error);
    return res.status(500).json({ message: "Error getting job applications", error });
  }
}



export const deleteJobApplicant = async (req, res) => {
  const { _id, owner } = req.query

  if (!req?.user?._id || !owner || !_id) {
    return res.status(400).json("missing required fields");
  }


  if (!mongoose.Types.ObjectId.isValid(req.user._id) || !mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json("invalid objectid format");
  }


  if (!new mongoose.Types.ObjectId(req.user._id).equals(new mongoose.Types.ObjectId(owner))) {
    return res.status(403).json("unauthorized request You cannot delete this job");
  }

  try {
    const deletedoc = await JobApply.findByIdAndDelete(_id)

    if (!deletedoc) {
      return res.status(404).json("Job application not found or already deleted")
    }

    return res.status(200).json("deleted successfully")
  } catch (error) {
    return res.status(500).json({
      message: "error during job deletion",
      error: error?.message || error,
    })
  }
}



export const jobMelGayaHaiToCallBandKarDO = async (req, res) => {
  const { _id } = req.params;
  try {
    const data = await JobApply.findById(_id); 
    if (!data) return res.status(404).json("Document not found");

    data.flag = !data.flag;
    await data.save({ validateBeforeSave: false });

    return res.status(200).json("updated successfully");
  } catch (error) {
    return res.status(500).json("error during updation");
  }
}


export const allJobApplicationToYourCurrentArea = async (req, res) => {
  const { state, district } = req.query;
console.log(req.query)
 

  try {
    const allJobToYourLOcation = await JobApply.aggregate([
      {
        $match: {
          state: state.toLowerCase(),
          district: district.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "alldetails",
        },
      },
    ]);

    return res.status(200).json(allJobToYourLOcation);
  } catch (error) {
   
    return res.status(500).json({
      message: "Error during finding jobs in your location",
      error: error.message,
    });
  }
};
