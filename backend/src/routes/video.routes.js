import { Router } from "express"
import { UploadVideo, videoThatTheUserHasUploaded, toggleVideo, deleteVideo, searchVideos } from "../controller/video.controller.js"
import jwtVerify from "../middleware/jwtVerify.middleware.js"
import { upload } from "../middleware/multer.js"

export const videoRouter = Router()
videoRouter.route("/uploadvideo").post( upload.fields([
    
    { 
        name:"thumbnail",
        maxCount:1
    }

    ,{
     name:"videofile",
     maxCount:1

    }

]), jwtVerify, UploadVideo)

videoRouter.route("/allvideoofuser").get(jwtVerify, videoThatTheUserHasUploaded)
videoRouter.route("/delete").post(jwtVerify,  deleteVideo)
videoRouter.route("/toggle").post(jwtVerify, toggleVideo)
videoRouter.route('/search/:query').get(jwtVerify, searchVideos)