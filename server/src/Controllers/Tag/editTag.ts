import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Tag, { ITag } from "../../Model/Tag";

const editTag = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const tagId: string =
      typeof req.headers.tagid === "string" ? req.headers.tagid : "";

    let tagData: ITag = req.body;
    if (tagData.title) tagData.title = tagData.title.toLowerCase();
    if (tagData.color) tagData.color = tagData.color.toLowerCase();
    const user: IUser | null = await User.findById(userId);
    if (!tagId) {
      errorCode = 403;
      throw new Error("Tag ID not valid");
    }
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const tag: ITag | null = await Tag.findById(tagId);
    if (!tag) {
      errorCode = 404;
      throw new Error("Tag not found");
    }
    if (tag.owner.toString() !== userId) {
      errorCode = 403;
      throw new Error("User not have valid access");
    }
    console.log("absd");
    const existing: ITag | null = await Tag.findOne({
      $or: [{ title: tagData.title }, { color: tagData.color }],
      owner: user.id,
      id: { $ne: tagId },
    });
    console.log(tagId)
    console.log(" existing = ", existing);
    if (existing) {
      errorCode = 409;
      throw new Error("tag already exists");
    }
    const updatedTag = await Tag.findByIdAndUpdate(tagId, tagData, {
      returnDocument: "after",
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      updatedTag,
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

export default editTag;
