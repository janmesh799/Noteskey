import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../Model/User";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorCode: number | null = null;
  try {
    const userId: string = req.cookies.userId;
    const user: IUser | null = await User.findById(userId);
    if (!user || user.verified === false) {
      errorCode = 403;
      throw new Error("access denied");
    } else {
      req.headers.userId = userId;
      next();
    }
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
}

export default isAuthenticated;
