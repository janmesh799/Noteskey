import mongoose from "mongoose";
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import { decryptData } from "../../utils/encryption";
import Tag, { ITag } from "../../Model/Tag";

const getNotesByTag = async (req: Request, res: Response) => {
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
    const tag: ITag | null = await Tag.findById(tagId);
    if (!tag) {
      errorCode = 404;
      throw new Error("tag not found");
    }

    // Fetching notes based on the filter
    let notes: INote[] = await Note.find({ tag: tag._id });
    let updatedNotes = await Promise.all(
      notes.map(async (note) => {
        note.content = decryptData(note.content);
        note.title = decryptData(note.title);
        note.tag = tag;
        return note;
      })
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: updatedNotes,
    });
  } catch (err: any) {
    console.error(err);
    return res
      .status(errorCode ? errorCode : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: err.message,
        errors: getReasonPhrase(errorCode ? errorCode : 500),
      });
  }
};

export default getNotesByTag;
