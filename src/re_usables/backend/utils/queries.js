import { stringifyNparse } from "./helpers/stringifyNparse";

export const find_user_one_doc_query = async (
  Model,
  {
    user_id,
    filter = {},
    projection = "-__v",
    populate = null,
    lean = true,
  } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.findOne({ user_id, ...filter }).select(projection);

  if (populate) query = query.populate(populate);

  const data = lean ? await query.lean() : await query;

  // Only stringify/parse if lean, since non-lean needs to stay a Mongoose doc
  return lean ? stringifyNparse(data) : data;
};

export const find_user_docs_query = async (
  Model,
  {
    user_id,
    filter = {},
    projection = "-__v",
    sort = null,
    limit = null,
    populate = null,
    lean = true,
  } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.find({ user_id, ...filter }).select(projection);

  if (sort) query = query.sort(sort);
  if (limit) query = query.limit(limit);
  if (populate) query = query.populate(populate);

  const data = lean ? await query.lean() : await query;
  return stringifyNparse(data);
};

export const find_user_docs_paginated_query = async (
  Model,
  {
    user_id,
    filter = {},
    projection = "-__v",
    sort = { createdAt: -1 },
    page = 1,
    limit = 20,
    populate = null,
    lean = true,
  } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  const skip = (page - 1) * limit;

  let query = Model.find({ user_id, ...filter })
    .select(projection)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (populate) query = query.populate(populate);

  const docs = lean ? await query.lean() : await query;
  const total = await Model.countDocuments({ user_id, ...filter });

  return {
    docs,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const update_user_doc_query = async (
  Model,
  { user_id, filter = {}, update = {}, projection = "-__v", lean = true } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.findOneAndUpdate({ user_id, ...filter }, update, {
    new: true,
    runValidators: true,
  }).select(projection);

  const data = lean ? await query.lean() : await query;

  // ✅ Only stringify/parse if lean
  return lean ? stringifyNparse(data) : data;
};

export const delete_user_doc_query = (
  Model,
  { user_id, filter = {}, projection = "-__v", lean = true } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.findOneAndDelete({ user_id, ...filter }).select(projection);

  return lean ? query.lean() : query;
};

export const create_user_doc_query = async (
  Model,
  { user_id, data = {}, projection = "-__v", lean = true } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  // ✅ Force user_id into the doc (security)
  const docToInsert = { ...data, user_id };

  // Insert
  const created = await Model.create(docToInsert);

  // Refetch clean with projection + lean
  let query = Model.findOne({ _id: created._id }).select(projection);

  const result = lean ? await query.lean() : await query;

  // Only parse if lean
  return lean ? stringifyNparse(result) : result;
};
