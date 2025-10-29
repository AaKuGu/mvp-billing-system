import { register_business_handler } from "../r_register/funcs";
import { update_business_handler } from "../r_update/funcs";

export const handleSubmit = async (
  e,
  session,
  formData,
  router,
  setError,
  data
) => {
  e.preventDefault();
  setError(null);

  const user_id = await session?.user?.id;

  let data_to_send;

  if (user_id) {
    data_to_send = { ...formData, user_id };
  }

  //   alert("data : " + JSON.stringify(data));

  if (data?._id) {
    //if data is true, it means we have to update instead of create
    data_to_send = formData;
    let id = data?._id;

    // alert(
    //   "update id : /features/business_registraion/BusinessRegistration.jsx : " +
    //     id
    // );

    await update_business_handler(id, data_to_send, router);
  } else {
    await register_business_handler(data_to_send, router);
  }

  //   hide_loading();
};

export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
