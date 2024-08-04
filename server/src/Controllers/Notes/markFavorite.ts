import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import User, { IUser } from "../../Model/User";
import Note, { INote } from "../../Model/Note";
import Favorite, { IFavorite } from "../../Model/Favorite";
import mongoose from "mongoose";

type markFavoriteDto = {
  noteId: string;
  mark: boolean;
};

const markFavorite = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    const userId: string =
      typeof req.headers.userId === "string" ? req.headers.userId : "";
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      errorCode = 403;
      throw new Error("User not valid");
    }
    const favoriteData: markFavoriteDto = req.body;
    const noteId: string = favoriteData.noteId;
    const mark: boolean = favoriteData.mark;

    const note: INote | null = await Note.findOne({
      sharedWith: { $in: [new mongoose.Types.ObjectId(userId)] },
      _id: noteId,
    });

    if (!note) {
      errorCode = 404;
      throw new Error("Note not found");
    }

    let favorite: IFavorite | null = await Favorite.findOne({
      user: user.id,
    });
    if (!favorite) {
      const newFavorite: IFavorite = await Favorite.create({
        user: user._id,
        notes: [],
      });
      favorite = newFavorite;
    }
    favorite.notes = favorite.notes.filter((elem) => elem.toString() !== note.id.toString());
    if (mark) {
      favorite.notes.push(note.id);
    }
    await favorite.save();
    res.status(StatusCodes.OK).json({
      success: true,
      message: mark
        ? "Note successfully added to Favorites"
        : "Note successfully removed from Favorites",
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

export default markFavorite;
