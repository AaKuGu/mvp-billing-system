import React from "react";

const User_Details_Show = ({ user_data }) => {
  if (!user_data) return null;

  const { name, email, emailVerified, createdAt, updatedAt, id, hasBusiness } =
    user_data;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 space-y-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>{name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Email Verified:</span>
          <span>{emailVerified ? "Yes ✅" : "No ❌"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Business Registered:</span>
          <span>{hasBusiness ? "Yes" : "No"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">User ID:</span>
          <span className="truncate max-w-[150px] text-gray-500">{id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Created At:</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Last Updated:</span>
          <span>{formatDate(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default User_Details_Show;
