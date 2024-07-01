import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const MONGO_URI: string = process.env.MONGO_URI ? process.env.MONGO_URI : "";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err:any) {
    console.log(`MONGO_URI = ${MONGO_URI}`)
    console.error(err.message);
    process.exit(1);
  }
};
