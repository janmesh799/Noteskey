import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import mongoose from "mongoose";

const deleteNotes = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    console.log(req.body);
    const { notesData, allNotes }: { notesData: [string]; allNotes: boolean } =
      req.body;
    // console.log(req.headers);
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    console.log("userId = ", userId);
    if (!userId) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const user: IUser | null = await User.findById(userId);
    console.log("user = ", user);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }

    if (allNotes === true) {
      await Note.deleteMany({ owner: user.id }).then((notes) => {
        return res
          .status(StatusCodes.OK)
          .json({ success: true, message: "All notes deleted" });
      });
    }

    if (notesData.length > 0) {
      const objectIds = notesData.map((id) => new mongoose.Types.ObjectId(id));
      await Note.deleteMany({ _id: { $in: objectIds } , owner:user.id})
        .then((result) => {
          console.log("Deleted Notes:", result);
          return res
            .status(StatusCodes.OK)
            .json({ success: true, deletedNotes: result });
        })
        .catch((err) => {
          console.error("Error deleting documents:", err);
          throw new Error(err.message);
        });
    }
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

export default deleteNotes;
