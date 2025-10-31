import { serverApiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const fetch_bill_details_api = (id) =>
  serverApiCallWrapper(async () => {
    console.log("process.env : ", `${process.env.BACKEND_ROUTE}/bills/${id}`);

    const res = await axios.get(`http://localhost:3000/api/bills/${id}`);
    console.log("res bro res : ", res?.data);
    return res?.data;
  }, "Error Get /features/r_go/r_bills/r_final_bill");
