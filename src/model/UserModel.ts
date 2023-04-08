import { Document , Schema , model } from "mongoose"

interface iUser {
name: string,
email: string,
password: string,
token: string,
OTP: string,
verified: boolean
allPassword : any[]
date : string
}


interface User extends iUser , Document{}

const userSchema = new Schema ({
    name: {
        type: String,
        
    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    token: {
        type: String,

    },
    OTP: {
        type: String,

    },
    verified: {
        type: Boolean,
        default : false

    },
    allPassword : [],
    date : {
        type : String
    }
}, {timestamps: true})


const userModel = model<User>("userColl" , userSchema)

export default userModel