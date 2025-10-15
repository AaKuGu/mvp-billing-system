export const GreenButton = ({
  onClick,
  children,
  type = "button",
  loading = false,
}) => {
  return (
    <button
      type={type}
      className="bg-green-800 text-white px-3 py-1"
      onClick={onClick}
      disabled={loading}
    >
      {children}
    </button>
  );
};

// ✅ BlueButton.jsx
export const BlueButton = ({
  onClick,
  loading = false,
  children,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={loading ? undefined : onClick} // disable click if loading
      disabled={loading}
      className={`bg-blue-500 text-white px-5 py-2 rounded 
        transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const RedButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="bg-red-600 text-white px-3 py-1 flex items-center justify-center gap-2 text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import Link from "next/link";
import { FiX } from "react-icons/fi"; // Feather close icon

export const RoundButtonClose = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-5 h-5 rounded-full 
                 border-2 border-gray-600 text-gray-600 
                 hover:bg-gray-600 hover:text-white 
                 transition-colors duration-200 shadow-sm"
    >
      <FiX size={16} />
    </button>
  );
};

export const CreateButton = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="w-full border border-[2px] border-teal-800 rounded-full hover:bg-teal-800 hover:text-white px-5 py-2 text-teal-800 transition w-full sm:w-auto text-center"
    >
      {children}
    </Link>
  );
};
