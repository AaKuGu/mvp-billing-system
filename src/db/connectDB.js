// import mongoose from "mongoose";

// let isConnected = null; // ✅ global cached connection state

// export const dbConnect = async () => {
//   if (isConnected) {
//     // console.log("✅ Using existing database connection");
//     return;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error("❌ MONGODB_URI is missing!");
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI);
//     isConnected = db.connections[0].readyState; // ✅ mark as connected
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//     throw err;
//   }
// };

// /db/connectDB.js
import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");

  try {
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          tls: true,
          // optional: you **don't need dbName** here if it's in the URI
        })
        .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};
