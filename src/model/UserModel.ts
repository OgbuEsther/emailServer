import { Document , Schema , model } from "mongoose"

interface iUser {
name: string,
email: string,
password: string,
token: string,
verified: boolean

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
    verified: {
        type: Boolean,

    }
}, {timestamps: true})


const userModel = model<User>("userColl" , userSchema)

export default userModel