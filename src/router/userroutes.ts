import {Router} from "express"
import { changeUserPassword, createUser, getAllUsers, requestPassword, verifyUser } from "../controller/UserController"


const user = Router()

user.get("/users" ,getAllUsers)
user.post("/create" , createUser)
user.route("/:userId/verified").post(verifyUser);
user.route("/reset-password").post(requestPassword);
user.route("/:userId/:token/reset-password").post(changeUserPassword);



export default user