// export const find_user_one_doc = (
//   Model,
//   {
//     user_id,
//     filter = {},
//     projection = "-__v",
//     populate = null,
//     lean = true,
//   } = {}
// ) => {
//   if (!user_id) throw new Error("user_id is required");

//   let query = Model.findOne({ user_id, ...filter }).select(projection);

//   if (populate) query = query.populate(populate);

//   return lean ? query.lean() : query;
// };

// export const find_user_docs = (
//   Model,
//   {
//     user_id,
//     filter = {},
//     projection = "-__v",
//     sort = null,
//     limit = null,
//     populate = null,
//     lean = true,
//   } = {}
// ) => {
//   if (!user_id) throw new Error("user_id is required");

//   let query = Model.find({ user_id, ...filter }).select(projection);

//   if (sort) query = query.sort(sort);
//   if (limit) query = query.limit(limit);
//   if (populate) query = query.populate(populate);

//   return lean ? query.lean() : query;
// };

// export const delete_user_doc = (
//   Model,
//   id,
//   user_id,
//   lean = true,
//   projection = "-__v"
// ) => {
//   const query = Model.findOneAndDelete({ _id: id, user_id }).select(projection);
//   return lean ? query.lean() : query;
// };

// ✅ Unified Options Type
// {
//   user_id: string,
//   filter?: object,
//   projection?: string | object,
//   populate?: string | object | array,
//   sort?: object,
//   limit?: number,
//   skip?: number,
//   update?: object,
//   lean?: boolean (default true)
// }

export const find_user_one_doc = (
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

  return lean ? query.lean() : query;
};

export const find_user_docs = (
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

  return lean ? query.lean() : query;
};

export const find_user_docs_paginated = async (
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

export const update_user_doc = (
  Model,
  { user_id, filter = {}, update = {}, projection = "-__v", lean = true } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.findOneAndUpdate({ user_id, ...filter }, update, {
    new: true,
    runValidators: true,
  }).select(projection);

  return lean ? query.lean() : query;
};

export const delete_user_doc = (
  Model,
  { user_id, filter = {}, projection = "-__v", lean = true } = {}
) => {
  if (!user_id) throw new Error("user_id is required");

  let query = Model.findOneAndDelete({ user_id, ...filter }).select(projection);

  return lean ? query.lean() : query;
};

export const create_user_doc = async (
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

  return lean ? query.lean() : query;
};
