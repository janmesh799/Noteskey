import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";

import mongoose from "mongoose";

const getNoteById = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    const noteId: string = req.params.id;

    const temp: INote | null = await Note.findOne({ _id: noteId });
    console.log(temp);
    console.log(userId);

    const note: INote[] | null = await Note.find({
      sharedWith: { $in: [new mongoose.Types.ObjectId(userId)] },
    });
    console.log(note);

    if (!note) {
      errorCode = 404;
      throw new Error("Note not found");
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: note,
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

export default getNoteById;