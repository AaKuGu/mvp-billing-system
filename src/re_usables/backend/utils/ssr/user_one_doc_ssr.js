import { init } from "../init_request";
import { find_user_one_doc_query } from "../queries";

export const user_one_doc_ssr = async (
  Model,
  { filter = {}, projection = "-__v", populate = null, lean = true } = {}
) => {
  const { success, user_id, message } = await init();

  if (!success) {
    throw new Error(message || "Unauthorized");
  }

  const doc = await find_user_one_doc_query(Model, {
    user_id,
    filter,
    projection,
    populate,
    lean,
  });

  if (!doc) {
    throw new Error("Document not found");
  }

  return { data: doc };
};
