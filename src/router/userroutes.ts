import {Router} from "express"
import { changeUserPassword, createUser, requestPassword, verifyUser } from "../controller/UserController"


const user = Router()

user.post("/create" , createUser)
user.route("/:userId/verified").post(verifyUser);
user.route("/reset-password").post(requestPassword);
user.route("/:userId/:token/reset-password").post(changeUserPassword);



export default user