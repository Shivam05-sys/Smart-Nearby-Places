import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected:", conn.connection.host);
}
