export const stringifyNparse = (data) => {
  if (data === undefined || data === null) return data;

  try {
    // JSON-safe conversion removes ObjectIds, Dates, Buffers, etc.
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("stringifyNparse error:", error);
    return data; // fallback: return raw data if something breaks
  }
};
