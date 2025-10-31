import handleError from "./error/HandleError";
import CustomError from "./error/CustomError";
import { init } from "./init_request";

export const controllerFunc = (
  func,
  error_context = "",
  requireAuth = true
) => {
  return async (req, ...args) => {
    try {
      if (requireAuth) {
        const { success, message = null, user_id = null } = await init();

        if (!success) {
          throw new CustomError(message, 401, error_context);
        }

        req.context = { user_id };
      }

      return await func(req, ...args);
    } catch (error) {
      return handleError(error, error_context);
    }
  };
};
