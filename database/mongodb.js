import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("define mongodb vaiable in .env.local");
}

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

export default connectDb;
