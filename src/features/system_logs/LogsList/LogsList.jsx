import React from "react";

const LogsList = ({ logsList }) => {
  if (!logsList?.length) {
    return <p className="text-gray-500 italic">No logs found for today.</p>;
  }

  const getOperationColor = (type) => {
    switch (type) {
      case "product_created":
        return "bg-green-100 text-green-700 border-green-300";
      case "product_deleted":
        return "bg-red-100 text-red-700 border-red-300";
      case "product_updated":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="space-y-4  h-[700px] overflow-y-auto">
      {logsList.map((log) => {
        const payload = JSON.parse(log.payload);

        return (
          <div
            key={log._id}
            className="border rounded-xl shadow-sm p-4 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold border ${getOperationColor(
                  log.operationType
                )}`}
              >
                {log.operationType.replace("product_", "").replace("_", " ")}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Product Info */}
            <div className="mb-2">
              <p className="font-semibold text-lg">
                {payload.productName?.[0]?.value || "Unnamed Product"}
              </p>
              <p className="text-sm text-gray-600">
                Category:{" "}
                <span className="capitalize">{payload.category || "-"}</span>
              </p>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <p className="font-medium">Cost</p>
                <p>
                  {payload.cost?.[0]?.price} / {payload.cost?.[0]?.unit}
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="font-medium">Wholesale</p>
                <p>
                  {payload.wholesale?.[0]?.price} /{" "}
                  {payload.wholesale?.[0]?.unit}
                </p>
              </div>
              <div className="bg-yellow-50 p-2 rounded-lg text-center">
                <p className="font-medium">Retail</p>
                <p>
                  {payload.retail?.[0]?.price} / {payload.retail?.[0]?.unit}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LogsList;
