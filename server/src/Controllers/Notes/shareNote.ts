import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import generateSharedNoteEmail from "../../utils/generateSharedNoteEmail";
import mongoose from "mongoose"; // Import mongoose to validate ObjectId
import { listenerCount } from "stream";

const shareNote = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    let origin: string | undefined = req.get("origin");
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const { toUserEmail, noteId }: { toUserEmail: string; noteId: string } =
      req.body;

    if (!origin) {
      origin = "http://localhost:janmesh"
      // throw new Error("origin not defined");
    }

    const user: IUser | null = await User.findById(
      new mongoose.Types.ObjectId(userId)
    );
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    const toUser: IUser | null = await User.findOne({ email: toUserEmail });
    if (!toUser) {
      errorCode = 403;
      throw new Error("Shared user is not valid");
    }

    const note: INote | null = await Note.findById(
      new mongoose.Types.ObjectId(noteId)
    );
    if (!note) {
      errorCode = 403;
      throw new Error("Note is not valid");
    }

    if (note.owner.toString() === user._id) {
      errorCode = 403;
      throw new Error("You are the owner of this note");
    }

    if (note.sharedWith.includes(toUser.id)) {
      errorCode = 403;
      throw new Error("Already shared");
    }

    note.sharedWith.push(toUser.id);
    await note.save().then((note) => {
      generateSharedNoteEmail(user, toUser, note, origin);
    });

    return res.status(StatusCodes.OK).json({
      success: true,
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

export default shareNote;
