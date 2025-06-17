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

import { userRouter } from "./routes/user.routes.js"
import { reportuser } from "./routes/report.routes.js"
import { ratingRouter } from "./routes/rating.routes.js"
import { applyJob } from "./routes/jobApply.route.js"
import { commentRouter } from "./routes/comment.routes.js"
app.use("/user", userRouter)
app.use("/report", reportuser)
app.use("/rate", ratingRouter)
app.use("/apply", applyJob)
app.use("/commet", commentRouter)