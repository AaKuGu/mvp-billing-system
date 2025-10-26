// import { generateHindiName_api } from "./apiCall/apiCalls";

// export const generateHindiName = async (
//   englishName,
//   setLoading,
//   setHindiName
// ) => {
//   if (!englishName.trim()) return;
//   setLoading(true);
//   const data = await generateHindiName_api(englishName);
//   if (data.hindiText) setHindiName(data.hindiText);
//   setLoading(false);
// };

export const roundTo = (num, digits = 2) => {
  return Number(num.toFixed(digits));
};

export const on_change_handler = (func, field_name, field_value) => {
  func((prev) => ({ ...prev, [field_name]: field_value }));
};
