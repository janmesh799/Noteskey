import mongoose, { Document, Schema } from "mongoose";

// Define the Note interface
export interface ITag extends Document {
  owner: mongoose.Schema.Types.ObjectId;
  title: string;
  color: string;
}

const TagSchema: Schema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  color: { type: String, required: true },
});

export default mongoose.model<ITag>("Tag", TagSchema);
