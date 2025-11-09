import React from "react";

const Footer = ({ data }) => {
  const { businessAddress, businessEmail, businessContactNo } = data;
  return (
    <div className="mt-6 sm:mt-10 text-center text-[10px] sm:text-xs text-gray-500 border-t border-gray-300 pt-3 sm:pt-4">
      <p>Thank you for your business!</p>
      <p className="mt-1">
        This is a system-generated invoice and doesn't require a signature.
      </p>

      {(businessAddress || businessEmail || businessContactNo) && (
        <div className="mt-3 sm:mt-4 space-y-1">
          {businessAddress && (
            <p className="break-words px-2">Address: {businessAddress}</p>
          )}
          {businessEmail && (
            <p className="break-words">Email: {businessEmail}</p>
          )}
          {businessContactNo && <p>Phone: {businessContactNo}</p>}
        </div>
      )}
    </div>
  );
};

export default Footer;