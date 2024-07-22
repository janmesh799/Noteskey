import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";

const ValidateUser = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId).select([
      "-password",
      "-encryptionKey",
      "-createdOn",
      "-modifiedOn",
    ]);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User is validated",
      user,
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

export default ValidateUser;
