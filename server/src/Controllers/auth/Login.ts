import dotenv from "dotenv";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import User, { IUser } from "../../Model/User";
import bcryptjs from "bcryptjs";

dotenv.config();

const JsonSecretKey = process.env.JWT_SECRET_KEY || "abc";

const Login = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, validationErrors: errors.array() });
    }
    const { email, password }: { email: string; password: string } = req.body;
    const exists: IUser | null = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!exists) {
      errorCode = 404;
      throw new Error("User not found with this email address");
    }
    if (exists.verified === false) {
      errorCode = 403;
      throw new Error("User not verified");
    }
    const isPasswordMatch: boolean = await bcryptjs.compare(
      password,
      exists.password
    );
    if (!isPasswordMatch) {
      errorCode = 401;
      throw new Error("Password is incorrect");
    }
    const jsonPayload = {
      id: exists._id,
    };
    const token = jwt.sign(jsonPayload, JsonSecretKey);
    (req.session as any).user = { userId: exists._id };
    console.log("login req session = ", req.session);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); //expire in 24hrs
    res.cookie("userId", exists._id, { httpOnly: true, expires });
    return res
      .status(200)
      .json({ success: true, token: token, message: "Login Successful" });
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

export default Login;
