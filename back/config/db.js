import dotenv from "dotenv";
import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;

export const connectDB = async () => {
  await mongoose.connect(mongoDbUrl).then(() => console.log("DB CONNECTED"));
};
