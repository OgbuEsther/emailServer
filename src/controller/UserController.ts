import userModel from "../model/UserModel";
import { Request , Response } from "express";

//create user


export const createUser = async(req:Request , res:Response)=>{
   try {

    const {name,
email,
password,
token,
verified,} = req.body
    const user = await userModel.create({
        name,
        email,
        password,
        token,
        verified,
    })

    return res.status(201).json({
        message : "created",
        data : user
    })
   } catch (error) {
    return res.status(400).json({
        message : "erroor"
    })
   }
}

//get all 
export const getAllUsers = async(req:Request , res:Response)=>{
   try {

 
   const user = await userModel.find()

    return res.status(201).json({
        message : "created",
        data : user
    })
   } catch (error) {
    return res.status(400).json({
        message : "erroor"
    })
   }
}

//getOne
export const getOne = async(req:Request , res:Response)=>{
   try {


    const user = await userModel.findById(req.params.userId)

    return res.status(201).json({
        message : "created",
        data : user
    })
   } catch (error) {
    return res.status(400).json({
        message : "erroor"
    })
   }
}

//update user
export const updateUser = async(req:Request , res:Response)=>{
   try {

 
    const user = await userModel.findByIdAndUpdate(req.params.userId , {
name 
    } , {new:true})

    return res.status(201).json({
        message : "created",
        data : user
    })
   } catch (error) {
    return res.status(400).json({
        message : "erroor"
    })
   }
}

//delete
export const deleteUser = async(req:Request , res:Response)=>{
   try {


    const user = await userModel.findByIdAndRemove(req.params.userId)

    return res.status(201).json({
        message : "created",
        data : user
    })
   } catch (error) {
    return res.status(400).json({
        message : "erroor"
    })
   }
}