import { find_user_docs } from "@/re_usables/backend/utils/end_points";
import { server_action_wrapper } from "@/re_usables/backend/utils/server_actions/server_action_wrapper";

/**
 * @param Model - Mongoose model
 * @param options - Config object:
 *   errorMessage: string
 *   successMessage: string
 *   limit: number
 *   sort: object
 */
export const user_list_fetcher = (
  Model,
  {
    errorMessage,
    successMessage,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {},
    projection = "-__v",
    populate = null,
  } = {}
) => {
  return server_action_wrapper(async ({ user_id }) => {
    const list = await find_user_docs(Model, {
      user_id,
      filter,
      limit,
      sort,
      projection,
      populate,
    });

    if (!list) {
      throw new Error(errorMessage || "No data found");
    }

    return {
      data: list,
      message: successMessage || "Fetched successfully",
    };
  });
};

// src/features/r_go/r_customers/re_usables/server_actions.js
