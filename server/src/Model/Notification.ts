import mongoose, { Document, Schema } from "mongoose";

// Define the Notification interface
export interface INotification extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date; // This should match the schema field name
  updatedAt: Date; // If you want to include updatedAt as well
}

const NotificationSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
