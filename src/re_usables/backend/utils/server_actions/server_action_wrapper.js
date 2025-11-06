import { find_user_docs } from "../queries";
import { init } from "../init_request";

export const server_action_wrapper = (action, requireAuth = true) => {
  return async (...args) => {
    try {
      const { success, message, user_id } = await init();

      if (!success) {
        throw new Error(message || "Unauthorized");
      }

      return await action({ user_id: requireAuth ? user_id : null }, ...args);
    } catch (error) {
      console.error("Server Action Error:", error);
      throw new Error(error.message || "Server action failed");
    }
  };
};
