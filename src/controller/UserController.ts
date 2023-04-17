import userModel from "../model/UserModel";
import { Request, Response } from "express";
import { emailEnv } from "../utils/email";
import crypto from "crypto";

import mongoose from "mongoose";

//create user

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,

      verified,
    } = req.body;

    const getDate = new Date().toDateString()

    const genToken = crypto.randomBytes(32).toString("hex");
    const genOTP = crypto.randomBytes(2).toString("hex");
    const user = await userModel.create({
      name,
      email,
      password,
      token: genToken,
      verified:false,
      OTP: genOTP,
      date : getDate
    });



    await user?.save()

    await userModel.findByIdAndUpdate(user?._id, {
        $push: { allPassword: user?.password },
      
      });
    await emailEnv(user)
      .then((res) => console.log("this is res", res))
      .catch((err) => console.log("this is err", err));
    return res.status(201).json({
      message: "created and mail sent",
      data: user,
    
    });
  } catch (error:any) {
    return res.status(400).json({
      message: "erroor",
      data : error,
      err: error.message
    });
  }
};

//get all
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "erroor",
    });
  }
};

//getOne
export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.userId);

    return res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "erroor",
    });
  }
};

//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      {
        name,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "erroor",
    });
  }
};

//delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.userId);

    return res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "erroor",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { OTP } = req.body;

    const user = await userModel.findById(req.params.userId);

    if (user?.OTP === OTP) {
      if (user?.token !== "") {
        await userModel.findByIdAndUpdate(
          user?._id,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );

        return res.status(201).json({
          message: "Account has been verified, you can now signin",
          //   data: user,
        });
      } else {
        return res.status(400).json({
          message: "you have inputed a wrong otp",
        });
      }
    } else {
      return res.status(400).json({
        message: "you didn't meet the set credentials",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error",
      data: error,
    });
  }
};

//reset password
export const requestPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    console.log("this is user :", user);
    console.log("this is userToken :", user?.token);
    const token = crypto.randomBytes(32).toString("hex");
    if (user?.token === "" && user?.verified === true) {
      const userData = await userModel.findByIdAndUpdate(
        user?._id,
        { token: token },
        { new: true }
      );

      return res.status(200).json({
        message: "an email has been sent to you based on your request",
        data: userData,
        token: token,
        user: user,
      });
    } else {
      return res.status(200).json({
        message: "you didn't meet the set credentials",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "error",
    });
  }
};

//change user password

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const { userId, token } = req.params;

    const user = await userModel.findById(userId);

    await userModel.findByIdAndUpdate(user?._id, {
        $push: { allPassword: password },
      });

    
    // const getPasswordHistory = user?.allPassword.filter((el :any)=> el === password)

    // console.log("this is password history" ,getPasswordHistory )

    const getPasswordHistory = user?.allPassword.includes(password)



    if (user) {
      if (user?.token === "" && user?.verified === true) {
       if(getPasswordHistory){
        return res.status(400).json({
            message : `you can't use the same password twice , this password was created on : ${user?.date}`
        })
       }else{
        const theUser = await userModel.findByIdAndUpdate(
            userId,
            { password, token: "" },
            { new: true }
          );
  
          return res.json({
              message: "Your password has been changed, SUCCESSFULLY!",
              data: theUser,
            });
       }
      } else {
        return res.json({ message: "Please just go" });
      }
    }else {
        return res.json({ message: "User doesn't Exist" });
      }
  } catch (error) {
    return res.status(400).json({
      message: "error",
    });
  }
};
