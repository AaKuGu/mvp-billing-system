// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db();

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client,
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { customSession } from "better-auth/plugins";
import { BusinessDetails } from "@/models/BusinessDetails"; // adjust the path as needed
import { connect, dbConnect } from "@/db/connectDB"; // your mongoose connect method

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      try {
        await dbConnect(); // Ensure MongoDB/Mongoose connection is live

        const businessExists = await BusinessDetails.exists({
          user_id: user.id,
        });

        console.log(`businessExists : /lib/auth.js : `, businessExists);

        const to_return = {
          ...session,
          user: {
            ...user,
            hasBusiness: !!businessExists,
          },
        };

        console.log("to_return : /lib/auth.js : ", to_return);

        return to_return;
      } catch (err) {
        console.error("Error adding custom field to session:", err);
        return session; // fallback
      }
    }),
  ],
});
