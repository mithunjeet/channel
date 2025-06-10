import mongoose from "mongoose";
import { User } from "./user.model";
const commentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);
