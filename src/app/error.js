"use client";

export default function Error({ error, reset }) {
  console.log("error caught in error.js:", error);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="text-gray-500 mt-2">Please try again or contact support.</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
