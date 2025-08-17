import { cloudinaryUpload } from "../utils/cloudinary.upload.js"
import { Video } from "../models/video.model.js"
import mongoose from "mongoose"
const UploadVideo = async (req , res) => {

const {title, description}=req.body
if(title?.trim() === "" || description?.trim()===""){
    return res.status(404).json("you have not fill the  field properly");
}
    
const localPathOFThumbnail = req.files?.thumbnail[0]?.path
const  localPathOFVideoFile = req.files?.videofile[0]?.path

if( !localPathOFThumbnail ){
    return res.status(404).json("you have not upload the thumbnail")
}

if(!localPathOFVideoFile){

    return res.status(404).json("you have not upload the videofile")


}

const thumbnailresponseofCludinary = await cloudinaryUpload(localPathOFThumbnail)
const videoFileresponseofCludinary = await cloudinaryUpload(localPathOFVideoFile)

if(!thumbnailresponseofCludinary){
      return res.status(500).json("file has not uploaded on backend side  properly")
}
if(!videoFileresponseofCludinary){
 return res.status(500).json("file has not uploaded on backend side  properly")
}
    console.log("hiiiiiiiiiiiii")
    
const VideoCreateResponse = await Video.create({
thumbnail:thumbnailresponseofCludinary.url,
videofile:videoFileresponseofCludinary.url,
description:description,
title:title,
owner:req.user._id
    
})

console.log(VideoCreateResponse)
if (!VideoCreateResponse) {
    
    return res.status(500).json("video has not uploaded on database")
}
    
res.status(200).json("video has uploaded successfully have a nice day")

}


const videoThatTheUserHasUploaded = async(req,res)=>{
     console.log("hii from videoThatTheUserHasUploaded  controller")
    if (!req.user._id) { 
        return res.status(404).json("we are unable to find all video of user")
    }
    const allvideo = await Video.aggregate([
        {
         $match: {
            owner: new mongoose.Types.ObjectId(req.user._id)
           }
       }

    ])

// if(!allvideo){
//    return res.status(404).json("id of user not find to get all  video of user")
// }

    return res.status(200).json({ "message": "video fetch  successfully", data: allvideo })
}

const deleteVideo = async (req, res) => {
  const { _id } = req.body
  try {
    const video = await Video.findById(_id)

    if (!video) return res.status(404).json({ message: "Video not found" })
      
      if (video.owner.toString() !== req.user._id.toString())
        
      return res.status(403).json({ message: "You are not allowed to delete this video" })

      await Video.findByIdAndDelete(_id)
      
     res.status(200).json({ message: "video deleted successfully" })
  } catch (error) {
      
    console.error(error)
    res.status(500).json({ message: "server error while deleting video" })
  }
}



const toggleVideo = async (req, res) => {
    const { _id } = req.body;
    
  try {
    const video = await Video.findById(_id)

      if (!video) return res.status(404).json({ message: "video not found" })
      
      if (video.owner.toString() !== req.user._id.toString())
         
      return res.status(403).json({ message: "You are not allowed to update this video" })

    video.private = !video.private
    await video.save({validateBeforeSave : false})

      res.status(200).json({ message: "video privacy updated" })
      

  } catch (error) {
    
    res.status(500).json({ message: "server error while updating video privacy" })
  }
}


export {UploadVideo,  videoThatTheUserHasUploaded, deleteVideo , toggleVideo}