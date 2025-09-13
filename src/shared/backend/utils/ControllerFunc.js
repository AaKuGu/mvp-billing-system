// utils/controllerFunc.js
import handleError from "@/shared/backend/utils/error/HandleError";

export const controllerFunc = (func, catchError) => {
  return async (...args) => {
    try {
      return await func(...args); // ✅ run the actual handler
    } catch (error) {
      return handleError(error, catchError); // ✅ delegate to global error handler
    }
  };
};
