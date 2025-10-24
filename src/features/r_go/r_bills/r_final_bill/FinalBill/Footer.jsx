import React from "react";

const Footer = ({ data }) => {
  const { businessAddress, businessEmail, businessContactNo } = data;
  return (
    <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
      <p>Thank you for your business!</p>
      <p>This is a system-generated invoice and doesn't require a signature.</p>

      {/* Business contact details */}
      {(businessAddress || businessEmail || businessContactNo) && (
        <div className="mt-4 space-y-1">
          {businessAddress && <p>Address: {businessAddress}</p>}
          {businessEmail && <p>Email: {businessEmail}</p>}
          {businessContactNo && <p>Phone: {businessContactNo}</p>}
        </div>  
      )}
    </div>
  );
};

export default Footer;
