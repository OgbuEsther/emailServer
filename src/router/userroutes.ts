import {Router} from "express"
import { createUser, requestPassword, verifyUser } from "../controller/UserController"


const user = Router()

user.post("/create" , createUser)
user.route("/:userId/verified").post(verifyUser);
user.route("/reset-password").post(requestPassword);
export default user