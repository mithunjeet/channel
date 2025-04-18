import express from "express"
import cors from "cors"
export const app = express()
app.use(cors(
    {
        origin: "*",
        // credentials: true
        
    }
))

app.use( express.json({

    limit:"1000kb"
    

}))


app.use(express.urlencoded({
    limit:"1000kb",
    extended:true
}))

import {userRouter} from "./routes/user.routes.js"
app.use("/user" , userRouter)