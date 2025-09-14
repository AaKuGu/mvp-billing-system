// "use client";

// import Link from "next/link";
// import React, { useState } from "react";

// const Page = () => {
//   const [productName, setProductName] = useState("");
//   const [costPrice, setCostPrice] = useState("");
//   const [wholesalePrice, setWholesalePrice] = useState("");
//   const [retailPrice, setRetailPrice] = useState("");
//   const [pricePoints, setPricePoints] = useState([]);
//   const [unit, setUnit] = useState("pcs");
//   const [unitPrice, setUnitPrice] = useState("");

//   const handleAddPricePoint = () => {
//     if (unit && unitPrice) {
//       setPricePoints([...pricePoints, { unit, price: unitPrice }]);
//       setUnitPrice("");
//     }
//   };

//   const handleRemovePricePoint = (index) => {
//     setPricePoints(pricePoints.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = {
//       productName,
//       costPrice,
//       wholesalePrice,
//       retailPrice,
//       pricePoints,
//     };

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productData),
//       });

//       const data = await res.json();
//       console.log("Response:", data);

//       if (data.success) {
//         alert("✅ Product added successfully!");
//       } else {
//         alert("❌ Failed: " + data.message);
//       }
//     } catch (err) {
//       console.error("Error submitting product:", err);
//     }
//   };

//   return (
//     <div className="w-full text-black min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gray-50">
//       <header className="w-full text-center text-black text-2xl sm:text-3xl font-semibold mb-6">
//         Create Products
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-4"
//       >
//         {/* Product Name */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Product Name
//           </label>
//           <input
//             type="text"
//             className="w-full border rounded-lg p-2"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Cost Price */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Cost Price
//           </label>
//           <input
//             type="number"
//             className="w-full border rounded-lg p-2"
//             value={costPrice}
//             onChange={(e) => setCostPrice(e.target.value)}
//             required
//           />
//         </div>

//         {/* Wholesale Price */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Wholesale Price
//           </label>
//           <input
//             type="number"
//             className="w-full border rounded-lg p-2"
//             value={wholesalePrice}
//             onChange={(e) => setWholesalePrice(e.target.value)}
//             required
//           />
//         </div>

//         {/* Retail Price */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Retail Price
//           </label>
//           <input
//             type="number"
//             className="w-full border rounded-lg p-2"
//             value={retailPrice}
//             onChange={(e) => setRetailPrice(e.target.value)}
//             required
//           />
//         </div>

//         {/* Price Points */}
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Add Price Points
//           </label>
//           <div className="flex flex-col  gap-2">
//             <select
//               className="border rounded-lg p-2 w-full sm:w-auto"
//               value={unit}
//               onChange={(e) => setUnit(e.target.value)}
//             >
//               <option value="pcs">pcs</option>
//               <option value="bundle">bundle</option>
//               <option value="box">box</option>
//               <option value="jar">jar</option>
//               <option value="peti">peti</option>
//               <option value="patta">patta</option>
//               <option value="dozen">dozen</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Price"
//               className="flex-1 border rounded-lg p-2"
//               value={unitPrice}
//               onChange={(e) => setUnitPrice(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={handleAddPricePoint}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
//             >
//               Adding
//             </button>
//           </div>
//         </div>

//         {/* Display Price Points */}
//         <div className="space-y-2">
//           {pricePoints.map((p, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
//             >
//               <span>
//                 {p.unit} - ₹{p.price}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => handleRemovePricePoint(index)}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
//         >
//           Save Product
//         </button>

//         {/* Extra Actions */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           <button
//             type="button"
//             className="w-full sm:flex-1 bg-blue-500 text-white py-2 rounded-lg"
//             onClick={() => {
//               setProductName("");
//               setCostPrice("");
//               setWholesalePrice("");
//               setRetailPrice("");
//               setPricePoints([]);
//               setUnit("pcs");
//               setUnitPrice("");
//             }}
//           >
//             Add Another
//           </button>

//           <Link
//             href={`/go/products`}
//             className="w-full sm:flex-1 bg-gray-500 text-white py-2 rounded-lg text-center"
//           >
//             Back to Products
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;

"use client";
import CreateOrUpdateProducts from "@/features/products/createOrUpdateProducts/createOrUpdateProducts";
import React, { useState } from "react";

const page = () => {
  return <CreateOrUpdateProducts createOrUpdate={"create"} />;
};

export default page;
