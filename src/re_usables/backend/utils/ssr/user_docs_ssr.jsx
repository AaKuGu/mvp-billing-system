import { find_user_docs_query } from "../queries";
import { init } from "../init_request";
import Bill from "@/models/Bill";

export const user_docs_ssr = async (
  Model,
  { filter = {}, projection = "-__v", populate = null, lean = true } = {}
) => {
  const { success, user_id, message } = await init();

  if (!success) {
    throw new Error(message || "Unauthorized");
  }

  const docs = await find_user_docs_query(Model, {
    user_id,
    filter,
    projection,
    populate,
    lean,
  });

  if (!docs) {
    throw new Error("No documents found");
  }

  return { data: docs };
};
