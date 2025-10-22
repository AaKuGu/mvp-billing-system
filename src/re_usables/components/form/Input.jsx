import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  readOnly = false,
  min = null,
  max = null,
}) => {
  console.log("value : ", type, value);

  // Prevent scroll increment/decrement for number inputs
  const handleWheel = (e) => {
    if (type === "number") {
      e.target.blur(); // remove focus to stop scroll
    }
  };

  return (
    <input
      min={min}
      max={max}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      onWheel={handleWheel}
      readOnly={readOnly}
      className={`w-full p-1 border border-[1px] border-black outline-none  font-mono`}
    />
  );
};
