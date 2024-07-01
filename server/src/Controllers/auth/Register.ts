// src/Controllers/auth/Register.ts
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
const crypto = require("crypto");
import User, { IUser } from "../../Model/User";
import bcryptjs from "bcryptjs";

const Register = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, validationErrors: errors.array() });
    }
    const { name, email, password } = req.body;
    const alreadyExists: IUser | null = await User.findOne({
      email: email.toLowerCase(),
    });
    if (alreadyExists) {
      if (alreadyExists.verified === false) {
        await User.findOneAndDelete({ email: email.toLowerCase() });
      } else {
        errorCode = 409;
        throw new Error("User already Exists");
      }
    }
    const key = crypto.randomBytes(32).toString("hex");
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      encryptionKey: key,
    });
    await newUser.save().then((user) => {
      return res
        .status(200)
        .json({ success: true, message: "User Created Successfull" });
    });
  } catch (err: any) {
    console.log(err);
    return res
      .status(errorCode ? errorCode : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: err.message,
        errors: getReasonPhrase(errorCode ? errorCode : 500),
      });
  }
};

export default Register;
