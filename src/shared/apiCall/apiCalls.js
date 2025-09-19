import axios from "axios";
import { apiCallWrapper } from "./apiCallWrapper";

export const generateHindiName_api = (englishName) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/open_ai/generateHindiText`, {
      englishName,
    });
    return res.data;
  }, "Error in shared/apiCall/apiCalls.js");
