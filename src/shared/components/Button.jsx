export const GreenButton = ({ onClick, children }) => {
  return (
    <button type="button" className="bg-green-800 text-white px-5 py-2" onClick={onClick}>
      {children}
    </button>
  );
};

export const BlueButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="bg-blue-500 text-white px-5 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const RedButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="bg-red-600 text-white px-5 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

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
