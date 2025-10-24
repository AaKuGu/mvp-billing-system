import React from "react";

const Dashboard_Card = ({ title, value, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-600 mb-2">{title}</h2>
      <p
        className={`text-3xl font-bold ${
          colorClasses[color] || "text-blue-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default Dashboard_Card;
