import { headers } from "next/headers";
import { dbConnect } from "@/db/connectDB";
import { auth } from "@/lib/auth";

export const init = async () => {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    return { success: true, user_id: session.user.id };
  } catch (err) {
    return { success: false, message: err.message || "Init Error" };
  }
};
