export const GreenButton = ({ onClick, children }) => {
  return (
    <button className="bg-green-500 text-white px-5 py-2" onClick={onClick}>
      {children}
    </button>
  );
};

export const BlueButton = ({ onClick, children }) => {
  return (
    <button className="bg-blue-500 text-white px-5 py-2" onClick={onClick}>
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
