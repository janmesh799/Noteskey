import mongoose, { Document, Schema } from "mongoose";

// Define the Note interface
export interface INote extends Document {
  owner: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  attachments?: {
    type: string;
    url: string;
  }[];
  priority: Priority;
  deadline: Date;
  status: Status;
  sharedWith: mongoose.Schema.Types.ObjectId[];
  encryptionKey?: string;
  createdOn: Date;
  modifiedOn: Date;
}

// Define enums for priority and status
export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum Status {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

const NoteSchema: Schema = new Schema(
  {
    owner: {
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
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.LOW,
    },
    deadline: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.NOT_STARTED,
    },
    sharedWith: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default:[]
    },
    encryptionKey: { type: String, required: true, default:'123' },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "modifiedOn" },
  }
);

export default mongoose.model<INote>("Note", NoteSchema);
