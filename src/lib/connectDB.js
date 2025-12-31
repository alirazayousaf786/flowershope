// lib/connectDB.js  (or utils/connectDB.js)
import mongoose from "mongoose";

const connectDB = async () => {
  // If already connected, reuse the connection
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Good for Next.js
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // DO NOT use process.exit(1) here!
    // Instead, throw the error so the API route can handle it
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;