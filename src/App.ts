import express, {Application} from "express"
import cors from "cors"
import user from "./router/userroutes"

export const mainApp = async(app:Application) =>{
    
app.use(express.json())
app.use(cors())

app.use("/api" , user)
}

