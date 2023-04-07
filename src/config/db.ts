import mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/emailServer"

export const dbConfig =()=>{
    try {
        const dbConnect = mongoose.connect(url)
        console.log(`data base connected`)

    } catch (error) {
        console.log(`failed to connect`)
    }
}

