import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import User, { IUser } from "../../Model/User";
import Favorite, { IFavorite } from "../../Model/Favorite";
import Note, { INote } from "../../Model/Note";
import { decryptData } from "../../utils/encryption";
import mongoose from "mongoose";
import Tag, { ITag } from "../../Model/Tag";

const getFavorites = async (req: Request, res: Response) => {
  let errorCode: null | number = null;
  try {
    console.log('get favorites')
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";

    if (!userId) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const favorite: IFavorite | null = await Favorite.findOne({
      user: user._id,
    });
    let notes: INote[] = [];
    if (!favorite) {
      notes = [];
    } else {
      for (let i = 0; i < favorite.notes.length; i++) {
        let note: INote | null = await Note.findOne({
          sharedWith: { $in: [new mongoose.Types.ObjectId(userId)] },
          _id: favorite.notes[i],
        });
        if (!note) continue;
        const tag: ITag | null = await Tag.findById(note?.tag).select([
          "-owner",
        ]);
        if (tag) {
          note.tag = tag;
        }
        note.content = decryptData(note.content);
        note.title = decryptData(note.title);
        notes.push(note);
      }
    }
    res.status(StatusCodes.OK).json({ success: true, notes });
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

export default getFavorites;
