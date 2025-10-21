import { serverApiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchBusinessDetails_api = (userId) =>
  serverApiCallWrapper(async () => {
    const res = await axios.get(
      `${process.env.BACKEND_ROUTE}/business-details/user/${userId}`
    );
    // console.log("fetchBusinessDetails_api : res?.data : ", res?.data);
    return res.data;
  }, "/features/go");

