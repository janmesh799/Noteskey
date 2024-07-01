import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  createdOn: Date;
  modifiedOn: Date;
  encryptionKey:string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: true }, // will make verified false later when create that functionality
    encryptionKey:{type:String,required:true,default:''}
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "modifiedOn" },
  }
);

export default mongoose.model<IUser>("User", UserSchema);
