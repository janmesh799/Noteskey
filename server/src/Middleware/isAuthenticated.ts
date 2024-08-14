import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../Model/User";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import JWT, { JwtPayload } from "jsonwebtoken";

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorCode: number | null = null;
  const JwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY;
  try {
    if (!JwtSecretKey) {
      errorCode = 500;
      throw new Error("JWT secret key not valid");
    }

    let authToken: string | undefined = req.headers.authorization;
    if (!authToken) {
      errorCode = 401;
      throw new Error("Unauthorized");
    }
    authToken = authToken.split(" ")[1];
    console.log("auth token = ", authToken);
    // Verify token and ensure it's the correct type
    const data = JWT.verify(authToken, JwtSecretKey) as JwtPayload;
    if (typeof data !== "object" || !data.id || !data.iat) {
      errorCode = 401;
      throw new Error("Invalid token");
    }
    // Fetch user and check validity
    const user: IUser | null = await User.findById(data.id);
    if (!user || user.verified === false) {
      errorCode = 403;
      throw new Error("Access denied");
    } else {
      req.headers.userId = user.id.toString();
      req.headers.validUser = "true";
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
