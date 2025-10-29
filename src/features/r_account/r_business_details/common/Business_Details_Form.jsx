"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { handleSubmit, handleChange } from "./funcs";
import { fieldMeta } from "./constant";

const Business_Details_Form = ({ data = {} }) => {
  const [formData, setFormData] = useState({ ...data });
  const [error, setError] = useState(null);
  const router = useRouter();


  const {
    data: session,
    isPending,
    error: err,
    refetch,
  } = authClient.useSession();

  return (
    <div className="max-w-2xl mx-auto my-2 bg-white shadow-md rounded-2xl p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Business Registration
      </h1>

      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            session,
            formData,
            router,
            setError,
            data
          )
        }
        className="space-y-6"
      >
        {Object.entries(fieldMeta).map(
          ([key, { label, required, placeholder }]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center sm:gap-6"
            >
              <label
                htmlFor={key}
                className="sm:w-1/3 font-medium text-gray-700 flex items-center justify-between"
              >
                {label}
                {required ? (
                  <span className="text-red-500 ml-1">*</span>
                ) : (
                  <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                )}
              </label>

              <input
                id={key}
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder={placeholder}
                required={required}
                className="sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2.5 mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              />
            </div>
          )
        )}

        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="pt-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Registering..." : "Register Business"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Business_Details_Form;
