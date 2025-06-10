
import mongoose from "mongoose";
import { User } from "./user.model";
const jobApplySchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currentWage: {
       type: Number,
       required : true 
    },
    expectedWage: {
        type: Number,
        required: true
    },
    workRangeKm: {
        type: Number,
        required : true
    },

    state : {
        type: String,
        required: true,
        index:true
    },
    district: {
        type: String,
        required: true,
        index: true
    },
    village: {
        type: String,
        required: true,
        index: true
    },
    jobcommitment: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true 
    }
   
      
})

export  const JobApply = mongoose.model("JobApply" , jobApplySchema)