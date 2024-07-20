import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Tag, { ITag } from "../../Model/Tag";

const deleteTag = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const tagId: string =
      typeof req.headers.tagid === "string" ? req.headers.tagid : "";

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    await Tag.findByIdAndDelete(tagId).catch((err) => {
      errorCode = 500;
      throw new Error("Tag not valid");
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Tag deleted",
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

export default deleteTag;
