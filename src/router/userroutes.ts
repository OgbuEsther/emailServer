import {Router} from "express"
import { createUser, verifyUser } from "../controller/UserController"


const user = Router()

user.post("/create" , createUser)
user.route("/:userId/verified").post(verifyUser);

export default user