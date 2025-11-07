import { register_business_handler } from "../r_register/funcs";
import { update_business_handler } from "../r_update/funcs";

// export const handleSubmit = async (e, formData, router, setError, data) => {
//   e.preventDefault();
//   setError(null);

//   let data_to_send;

//   //   alert("data : " + JSON.stringify(data));

//   if (data?._id) {
//     //if data is true, it means we have to update instead of create
//     data_to_send = formData;
//     let id = data?._id;

//     // alert(
//     //   "update id : /features/business_registraion/BusinessRegistration.jsx : " +
//     //     id
//     // );

//     await update_business_handler(id, data_to_send, router);
//   } else {
//     await register_business_handler(data_to_send, router);
//   }

//   //   hide_loading();
// };

export const handleSubmit = async (
  e,
  create_or_update,
  formData,
  router,
  business_id = null
) => {
  e.preventDefault();
  if (create_or_update === "create") {
    await register_business_handler(formData, router);
  } else if (create_or_update === "update") {
    alert(JSON.stringify(business_id, null, 2));
    await update_business_handler(business_id, formData, router);
  }
};
export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
