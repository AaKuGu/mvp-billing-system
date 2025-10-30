import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const controllerFunc = (func, catchError, requireAuth = true) => {
  return async (req, ...args) => {
    try {
      let user_id = null;

      if (requireAuth) {
        const session = await auth.api.getSession({
          headers: await headers(),
        });

        if (!session?.user) {
          throw new CustomError("Unauthorized", 401, catchError);
        }

        user_id = session.user.id;
        req.user_id = user_id; // ✅ attach to request
      }

      return await func(req, ...args);
    } catch (error) {
      return handleError(error, catchError);
    }
  };
};
