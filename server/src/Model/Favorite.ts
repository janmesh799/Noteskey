import mongoose, { Document, Schema } from "mongoose";

// Define the Notification interface
export interface IFavorite extends Document {
  user: mongoose.Schema.Types.ObjectId;
  notes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date; // This should match the schema field name
  updatedAt: Date; // If you want to include updatedAt as well
}

const FavoriteSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true,
      },
    ],
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
