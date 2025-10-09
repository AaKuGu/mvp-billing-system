import React from "react";

const DisplayTable = ({ product }) => {
  return (
    <>
      {product?.units?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">लाइव प्रीव्यू</h3>
          <table className="w-full border-collapse border border-gray-400 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">लेवल</th>
                <th className="border p-2">यूनिट का नाम</th>
                <th className="border p-2">प्रति पैरेंट Quantity</th>
                <th className="border p-2">कुल Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.units.map((u) => (
                <tr key={u.level}>
                  <td className="border p-2">{u.level}</td>
                  <td className="border p-2">{u.unitName}</td>
                  <td className="border p-2">{u.perParentQuantity ?? "-"}</td>
                  <td className="border p-2">{u.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DisplayTable;
