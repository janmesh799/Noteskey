import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import { encryptData } from "../../utils/encryption";

const createNote = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    const body: Partial<INote> = req.body;
    const note = new Note({
      ...body,
      owner: user._id,
    });
    note.content = encryptData(note.content);
    note.title = encryptData(note.title);
    note.sharedWith.push(user.id);
    await note.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Note created successfully",
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

export default createNote;
