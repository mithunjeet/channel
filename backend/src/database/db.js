import mongoose from "mongoose"
const db_connect = async () => {
      try {
          const databaseConnectionInstance =  mongoose.connect(`${process.env.mongodburl}\ ${process.env.dataBaseName}`)
          console.log( "DATABASE CONNECTED SUCESSFULLY"+databaseConnectionInstance)
      } catch (error) {
          console.log(error)
          throw error
          
    }

}

export {db_connect};