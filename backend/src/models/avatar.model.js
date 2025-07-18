import mongoose from "mongoose";

const avatarSchema = mongoose.Schema({
    
    owner: {
        type:  mongoose.Types.ObjectId,
        ref: "User"
    },

    file: {
        // url
        type : String, 
        required : true
    }
    
},{ timestamps: true})

export const Avatar =  mongoose.model("Avatar", avatarSchema);

