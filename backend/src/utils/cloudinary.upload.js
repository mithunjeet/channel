import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
 
// fs kya hai ? fs ek file system jo node js  ka under milta hai  
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

export const cloudinaryUpload = async (localpath) => {
     
    try {
        if (localpath) {
            const response = await cloudinary.uploader.upload(localpath, { resource_type: "auto" });
            console.log(response)
            return response

        }
    } catch (error) {
          fs.unlinkSync(localpath)
          console.log(error)
          throw  error
    }
}