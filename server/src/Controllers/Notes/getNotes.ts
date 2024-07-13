const mongoose = require("mongoose");
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Note, { INote } from "../../Model/Note";
import User, { IUser } from "../../Model/User";
import { decryptData } from "../../utils/encryption";

const getNotes = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const date = req.headers.date as string | null;
    const priority = req.headers.priority as string | null;
    const status = req.headers.status as string | null;

    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    console.log(typeof user._id);
    // Build the filter object based on the provided headers
    const filter: any = {
      $or: [
        { owner: user._id },
        {
          sharedWith: {
            $in: [user._id],
          },
        },
      ],
    };
    if (date) {
      const parsedDate = new Date(date);
      filter.createdOn = {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
        $lte: new Date(parsedDate.setHours(23, 59, 59, 999)),
      };
    }
    if (priority) {
      filter.priority = priority;
    }
    if (status) {
      filter.status = status;
    }

    // Log the generated filter for debugging
    console.log("Generated Filter:", filter);
    console.log(JSON.stringify(filter, null, 2));
    // Fetching notes based on the filter
    let notes: INote[] = await Note.find(filter);
    notes = notes.map((note) => {
      note.content = decryptData(note.content);
      return note;
    });
    // console.log(notes[0].sharedWith);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: notes,
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

export default getNotes;