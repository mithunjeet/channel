import dotenv from "dotenv"
import { app } from "./app.js"
import { db_connect } from "./database/db.js"
dotenv.config({
    path:"./env"
})

db_connect()
    .then(() => {
        app.listen(process.env.port || 9000, () => {
             console.log(`server is running on port ${process.env.port}`)
       })  
    })
    .catch((error)=>{

      console.log("database connection failed!!!" + error)
    })
  
    app.get('/', (req, res) => {
        res.send('hii everboy this side mithun')
      })