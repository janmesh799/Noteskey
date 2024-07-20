import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Tag, { ITag } from "../../Model/Tag";
import mongoose from "mongoose";

const getTag = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const tagId: string = req.params.id;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const tag: ITag | null = await Tag.findOne({
      owner: userId,
      _id: new mongoose.Types.ObjectId(tagId),
    });
    if (!tag) {
      errorCode = 404;
      throw new Error("Tag not found");
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      tag,
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

export default getTag;
