
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
 

 export default async function  jwtVerify(req , res ,  next ) { 
    try {
        
        const token = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("hii frm jwt verify")
        if(!token)   return res.status(401).json({"message" : "TOKEN NOT FOUND"})  
        if (token) { 
            const decoded_token = jwt.verify(token, process.env.TokenSecreat);
            const user = await User.findById(decoded_token._id)
            if (!user) return  res.status(401).json({ "message": "UNAUTHORISED  REQUEST" })
            
            req.user = user
            next()
        }

    } catch (error) {

       return res.status(401).json({message : error})
  }
}



