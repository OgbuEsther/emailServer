import userModel from "../model/UserModel";
import { Request, Response } from "express";
import { emailEnv } from "../utils/email";
import crypto from "crypto";

//create user

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,

      verified,
    } = req.body;

    const genToken = crypto.randomBytes(32).toString("hex");
    const genOTP = crypto.randomBytes(2).toString("hex");
    const user = await userModel.create({
      name,
      email,
      password,
      token: genToken,
      verified,
      OTP: genOTP,
    });

    await emailEnv(user)
      .then((res) => console.log("this is res", res))
      .catch((err) => console.log("this is err", err));
    return res.status(201).json({
      message: "created and mail sent",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "erroor",
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
