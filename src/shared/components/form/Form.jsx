import React from "react";

const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={`border p-2 md:p-5 space-y-6 h-[600px] overflow-y-auto`}>
      {children}
    </form>
  );
};

export default Form;
