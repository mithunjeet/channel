import mongoose from "mongoose";
import { User } from "./user.model.js";
const reportSchema = mongoose.Schema({
    
    reason:{
        type: String,
        required : true 
    },
    
    content : {
         type : String
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    user:{ // here user is one  who  reported 
        type: mongoose.Schema.Types.ObjectId,
        ref : "User" 
    }
},{
   timestamps: true
})

export const Report = mongoose.model("Report" , reportSchema)