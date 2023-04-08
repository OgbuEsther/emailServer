import mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/emailServer"

export const dbConfig =()=>{
    try {
      mongoose.connect(url)
      mongoose.connection.on("open" , ()=>{
        console.log(`database connected`)
      })
        

    } catch (error) {
        console.log(`failed to connect`)
    }
}

