import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Tag, { ITag } from "../../Model/Tag";

const getAllTags = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const tags: ITag[] | null = await Tag.find({ owner: userId });
    if (!tags) {
      errorCode = 404;
      throw new Error("Tag not found");
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      tags,
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

export default getAllTags;
