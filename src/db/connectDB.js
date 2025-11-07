import mongoose from "mongoose";

let isConnected = null; // ✅ global cached connection state

export const dbConnect = async () => {
  if (isConnected) {
    // console.log("✅ Using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing!");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState; // ✅ mark as connected
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
};
