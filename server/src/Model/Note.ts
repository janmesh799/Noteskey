import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

// Define the Note interface
export interface INote extends Document {
  userId: mongoose.Schema.Types.ObjectId | IUser;
  title: string;
  content: string;
  attachments: {
    type: string;
    url: string;
  }[];
  priority: string;
  deadline: Date;
  status: string;
  sharedWith: (mongoose.Schema.Types.ObjectId | IUser)[];
  encryptionKey: string;
  createdOn: Date;
  modifiedOn: Date;
}
const NoteSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    attachments: [
      {
        type: { type: String },
        url: { type: String },
      },
    ],
    priority: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    encryptionKey: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "modifiedOn" },
  }
);
export default mongoose.model<INote>("Note", NoteSchema);
