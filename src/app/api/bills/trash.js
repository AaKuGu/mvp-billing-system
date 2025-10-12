//   setStock((prev) => {
//     const updated = { ...prev };
//     const soldQty = userInputQuantity;
//     // Find the index of the selected unit
//     const unitIndex = updated.units.findIndex(
//       (u) => u.unitName === selectedUnit
//     );
//     if (unitIndex === -1) return prev;
//     const currentUnit = updated.units[unitIndex];
//     if (soldQty > currentUnit.totalQuantity) {
//       alert("Not enough stock!");
//       return prev;
//     }
//     // 🔹 Reduce current unit
//     currentUnit.totalQuantity -= soldQty;
//     const difference = currentUnit.pointer - currentUnit.totalQuantity;
//     const a = Math.floor(difference / currentUnit.perParentQuantity);
//     if (a >= 1) {
//       currentUnit.pointer -= currentUnit.perParentQuantity * a;
//     }
//     let t = 1; // start with 1 for multiplication
//     for (let i = unitIndex + 1; i <= updated.units.length - 1; i++) {
//       t *= updated.units[i].perParentQuantity;
//       updated.units[i] = {
//         ...updated.units[i],
//         totalQuantity: updated.units[i].totalQuantity - soldQty * t,
//       };
//       const currentUnit = updated.units[i];
//       const difference = currentUnit.pointer - currentUnit.totalQuantity;
//       const a = Math.floor(difference / currentUnit.perParentQuantity);
//       if (a >= 1) {
//         currentUnit.pointer -= currentUnit.perParentQuantity * a;
//       }
//     }
//     const upperIndexStart = unitIndex - 1;
//     const func = (a, index) => {
//       if (index < 0) {
//         return;
//       }
//       const current = updated.units[index];
//       current.totalQuantity -= a;
//       const difference = current.pointer - current.totalQuantity;
//       const b = Math.floor(difference / current.perParentQuantity);
//       if (b >= 1) {
//         current.pointer -= b * current.perParentQuantity;
//         func(b, index - 1);
//       }
//     };
//     func(a, upperIndexStart);
//     // alert("updated : " + JSON.stringify(updated));
//     return updated;
//   });

//============================================================================================

// const stockUpdatedData = data.map(async (item) => {
//   const productId = item.productId || null;
//   // console.log("Product ID: ", productId);
//   const productData = await Product.findById(productId);
//   if (!productData) {
//     console.log(`Product with ID ${productId} not found.`);
//     return null;
//   }
//   console.log("Product Data: ", productData);

//   const udpatedStock = calculateStock(productData, item.quantity, item.unit);

//   const updatedProduct = await Product.findByIdAndUpdate(
//     productId,
//     { units: udpatedStock.units },
//     { new: true }
//   );
//   console.log("Updated Product Stock: ", updatedProduct);
//   return updatedProduct;
// });

// stockUpdatedData();
