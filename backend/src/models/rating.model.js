
import mongoose from "mongoose";
import { User } from "./user.model";
const ratingSchema = new mongoose.Schema({
 
    feedback: {
        type: String
    },
     owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  
    },
    value:{
        type: Number,
        required : true 
    },
    
    user: { 
        // user is one who has submitted the feedback
        type: mongoose.Schema.Types.ObjectId,
        ref :"User"
    }
    

}, { timestamps: true })

export const Rating = mongoose.model("Rating", ratingSchema);