import React from "react";

const Form = ({ onSubmit, style, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`p-2 md:p-5 space-y-6 h-[600px]  ${style}`}
    >
      {children}
    </form>
  );
};

export default Form;
