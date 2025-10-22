// app/go/business-details/page.jsx (or .tsx if using TypeScript)
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { update_business_handler } from "../r_update/funcs";
import { register_business_handler } from "../r_register/funcs";

// const initialFormState = {
//   businessName: "",
//   businessTagline: "",
//   businessDescription: "",
//   businessEmail: "",
//   businessContactNo: "",
//   businessAddress: "",
//   gstNumber: "",
// };

const Business_Details_Form = ({ data = null }) => {
  const [formData, setFormData] = useState({ ...data });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const {
    data: session,
    isPending, //loading state
    error: err, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  // console.log(
  //   "session?.user?.id features/business-details/BusinessRegistration : ",
  //   session?.user?.id
  // );

  const fieldMeta = {
    businessName: {
      label: "Business Name",
      required: true,
      placeholder: "Enter your business name",
    },
    businessDescription: {
      label: "Business Description",
      required: false,
      placeholder: "Describe your business",
    },
    businessTagline: {
      label: "Business Tagline",
      required: false,
      placeholder: "Catchy tagline for your business",
    },
    businessEmail: {
      label: "Business Email",
      required: true,
      placeholder: "you@example.com",
    },
    businessContactNo: {
      label: "Business Contact No.",
      required: true,
      placeholder: "+1 123 456 7890",
    },
    businessAddress: {
      label: "Business Address",
      required: false,
      placeholder: "123 Main St, City, Country",
    },
    gstNumber: {
      label: "GST Number",
      required: false,
      placeholder: "GSTIN / Tax ID (if applicable)",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user_id = await session?.user?.id;

    let data_to_send;

    if (user_id) {
      data_to_send = { ...formData, user_id };
    }

    if (data) {
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
  };

  return (
    <div className="flex flex-col max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Business Registration</h1>

      {/* {JSON.stringify(data)} */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 max-w-xl mx-auto p-4"
      >
        {Object.entries(fieldMeta).map(
          ([key, { label, required, placeholder }]) => (
            <div key={key} className="flex flex-col">
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                {label}
                {required && <span className="text-red-600">*</span>}
                {!required && (
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full select-none">
                    Optional
                  </span>
                )}
              </label>

              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Register Business"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Business_Details_Form;
