import mongoose, { Document , Schema , model } from "mongoose"

interface iUser {
name: string,
email: string,
password: string,
token: string,
OTP: string,
verified: boolean
allPassword : any[]
RCNumber : string;
staffID : string;
date : string
}


interface User extends iUser , Document{}

const companySchema = new Schema ({
    name: {
        type: String,
        
    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    RCNumber: {
        type: String,

    },
    token: {
        type: String,

    },
    staffID: {
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
    },
  

}, {timestamps: true})


const companyModel = model<User>("userColl" , companySchema)

export default companyModel