import { find_user_one_doc } from "@/re_usables/backend/utils/queries";
import { server_action_wrapper } from "@/re_usables/backend/utils/server_actions/server_action_wrapper";

/**
 * @param Model - Mongoose model
 * @param options - Config object:
 *   errorMessage: string
 *   successMessage: string
 *   filter: object
 *   projection: string
 *   populate: object|string|null
 *   lean: boolean
 */
// export const user_one_doc_fetcher = (
//   Model,
//   {
//     errorMessage,
//     successMessage,
//     filter: defaultFilter = {},
//     projection = "-__v",
//     populate: defaultPopulate = null,
//     lean: defaultLean = true,
//   } = {}
// ) => {
//   return server_action_wrapper(async ({ user_id, filter, populate, lean }) => {
//     const doc = await find_user_one_doc(Model, {
//       user_id,
//       filter: { ...defaultFilter, ...filter },
//       projection,
//       populate: populate ?? defaultPopulate,
//       lean: lean ?? defaultLean,
//     });

//     if (!doc) throw new Error(errorMessage || "Document not found");

//     return {
//       data: doc,
//       message: successMessage || "Fetched successfully",
//     };
//   });
// };

export const user_one_doc_fetcher = (
  Model,
  {
    errorMessage,
    successMessage,
    filter: defaultFilter = {},
    projection = "-__v",
    populate: defaultPopulate = null,
    lean: defaultLean = true,
  } = {}
) => {
  const r = server_action_wrapper(async ({ user_id }) => {});
};
