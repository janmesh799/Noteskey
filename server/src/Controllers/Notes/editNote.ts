import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import { encryptData } from "../../utils/encryption";

const editNote = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const noteData: INote = req.body;
    const noteId: string =
      typeof req.headers.noteid === "string" ? req.headers.noteid : "";
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    if (noteId === "") {
      errorCode = StatusCodes.BAD_REQUEST;
      throw new Error("Note Id is required");
    }
    const note: INote | null = await Note.findById(noteId);
    if (!note) {
      errorCode = 404;
      throw new Error("Note not found");
    }

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    if (
      !(
        note.owner.toString() === userId ||
        (user.id && note.sharedWith.includes(user.id))
      )
    ) {
      errorCode = 403;
      throw new Error("User not have valid access");
    }
    if (noteData.content) {
      noteData.content = encryptData(noteData.content);
    }

    const updatedNote = await Note.findByIdAndUpdate(noteId, noteData, {
      returnDocument: "after",
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      updatedNote,
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

export default editNote;
