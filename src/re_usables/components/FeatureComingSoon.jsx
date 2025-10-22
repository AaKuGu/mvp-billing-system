import React from "react";

const FeatureComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="bg-blue-100 p-6 rounded-full mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        🚧 Feature Coming Soon
      </h1>
      <p className="text-gray-500 max-w-md mb-4">
        We're working hard to bring this feature to you. Stay tuned for updates!
      </p>
      <button
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default FeatureComingSoon;
