import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { DashboardData } from "../../Types/dashboard";
import User, { IUser } from "../../Model/User";
import Note, { INote } from "../../Model/Note";
import Favorite from "../../Model/Favorite";
import Tag from "../../Model/Tag";
import { decryptData } from "../../utils/encryption";

const getDashboard = async (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
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

    // Get total notes where user is either the owner or shared with
    const numberOfTotalNotes = await Note.countDocuments({
      $or: [{ owner: userId }, { sharedWith: userId }],
    });

    // Get notes shared with the user but not owned by the user
    const numberOfNotesSharedWithMe = await Note.countDocuments({
      sharedWith: userId,
      owner: { $ne: userId },
    });

    // Get notes created by the user
    const numberOfNotesCreatedByMe = await Note.countDocuments({
      owner: userId,
    });

    // Get number of favorite notes
    const favoriteDoc = await Favorite.findOne({ user: userId });
    const numberOfFavoriteNotes = favoriteDoc ? favoriteDoc.notes.length : 0;

    // Get notes with tags
    const notesWithTags = await Note.aggregate([
      { $match: { owner: userId } },
      {
        $lookup: {
          from: "tags",
          localField: "tag",
          foreignField: "_id",
          as: "tagInfo",
        },
      },
      { $unwind: "$tagInfo" },
      { $group: { _id: "$tagInfo.title", count: { $sum: 1 } } },
      { $project: { tagName: "$_id", count: 1, _id: 0 } },
    ]);

    // Get recently created notes
    let recentlyCreated = await Note.find({ owner: userId })
      .sort({ createdOn: -1 })
      .limit(5);

    recentlyCreated = recentlyCreated.map((note) => {
      note.title = decryptData(note.title);
      note.content = decryptData(note.content);
      return note;
    });

    // Prepare response data
    const responseData: DashboardData = {
      userId: user.id.toString(),
      name: user.name,
      email: user.email,
      numberOfTotalNotes,
      numberOfNotesSharedWithMe,
      numberOfNotesCreatedByMe,
      numberOfFavoriteNotes,
      notesWithTags,
      recentlyCreated,
    };

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: responseData });
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

export default getDashboard;
