import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Tag, { ITag } from "../../Model/Tag";

const createTag = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    let body: Partial<ITag> = req.body;
    if (body.color) body.color = body.color.trim().toLowerCase();
    if (body.title) body.title = body.title.trim().toLowerCase();

    const existingTag: ITag | null = await Tag.findOne({
      owner: userId,
      $or: [{ title: body.title }, { color: body.color }],
    });

    if (existingTag) {
      errorCode = 409;
      if (body.color === existingTag.color) {
        throw new Error("tag with same color already exists");
      }
      if (body.title === existingTag.title) {
        throw new Error("tag with same title already exists");
      }
    }

    const tag = new Tag({
      ...body,
      owner: user._id,
    });

    await tag.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Note created successfully",
      data: tag,
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

export default createTag;
