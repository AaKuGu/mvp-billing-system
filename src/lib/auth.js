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
  trustedOrigins: [process.env.BETTER_AUTH_URL, "https://www.korobill.online"],
  emailAndPassword: {
    enabled: true,
  },
  // allowedOrigins: [
  //   "http://localhost:3000", // dev
  //   "https://korobill.online", // prod without www
  //   "https://www.korobill.online", // prod with www
  // ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      try {
        if (!user?.id) {
          // No logged-in user (shouldn’t happen normally)
          return { user: null, businessDetails: null };
        }

        await dbConnect(); // Ensure MongoDB/Mongoose connection is live

        const businessDetails = await BusinessDetails.findOne({
          user_id: user.id,
        }).lean();

        console.log(`businessDetails : /lib/auth.js : `, businessDetails);

        const to_return = {
          ...session,
          user,
          businessDetails: businessDetails || null,
        };

        console.log("to_return : /lib/auth.js : ", to_return);

        return to_return;
      } catch (err) {
        console.error("Error adding custom field to session:", err);
        return {
          ...session,
          businessDetails: null,
        };
      }
    }),
  ],
});
