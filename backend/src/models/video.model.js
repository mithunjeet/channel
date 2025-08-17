
import mongoose from "mongoose";

const videoSchema = new  mongoose.Schema({
   
    owner: {
         type: mongoose.Schema.Types.ObjectId,
        ref :"User" 
    }, 

    description: {
        type: String,
        required : true
    },
    title: {
        type: String,
        required : true
    },
    
    thumbnail: {
        type: String,
        required : true
    },
    
    videofile: {
        type: String,
        required : true
    },

    private : {
        type: Boolean,
        default: false
    }

    

}, {timestamps : true})


export  const Video = mongoose.model("Video", videoSchema);