import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";
import { handleDelete } from "../funcs";

// Desktop Table Row (for larger screens)
const DesktopRow = ({ p, index, onDelete, products, setProducts }) => {
  const mainUnit = p.units?.[0];
  const profit = mainUnit ? mainUnit.unitSellingPrice - mainUnit.unitCost : 0;
  const profitPercent = mainUnit
    ? ((profit / mainUnit.unitCost) * 100).toFixed(1)
    : 0;

  return (
    <tr className="hover:bg-blue-50/50 transition-colors border-b border-gray-200">
      {/* Serial Number */}
      <td className="px-4 py-3 text-sm font-medium text-gray-600">
        {index + 1}
      </td>

      {/* Product Name */}
      <td className="px-4 py-3">
        <div className="font-semibold text-gray-800">{p.productName}</div>
      </td>

      {/* Stock */}
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            mainUnit?.totalQuantity > 10
              ? "bg-green-100 text-green-800"
              : mainUnit?.totalQuantity > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {mainUnit?.totalQuantity || 0} {mainUnit?.unitName}
        </span>
      </td>

      {/* Cost Price */}
      <td className="px-4 py-3 text-right">
        <span className="text-gray-700 font-mono">
          {mainUnit?.unitCost ? `₹${mainUnit.unitCost.toLocaleString()}` : "-"}
        </span>
      </td>

      {/* Selling Price */}
      <td className="px-4 py-3 text-right">
        <span className="text-green-700 font-mono font-semibold">
          {mainUnit?.unitSellingPrice
            ? `₹${mainUnit.unitSellingPrice.toLocaleString()}`
            : "-"}
        </span>
      </td>

      {/* Profit */}
      <td className="px-4 py-3 text-right">
        {profit > 0 ? (
          <div className="text-right">
            <div className="text-purple-700 font-mono font-semibold">
              ₹{profit.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">{profitPercent}% margin</div>
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      <td className="py-3 flex items-center justify-center">
        <ViewUpdateDelete
          actions={{
            view: `/go/products/${p._id}`,
            update: `/go/products/update/${p._id}`,
            delete: true, // presence of `delete` triggers button
          }}
          onDelete={() => handleDelete(p._id, setProducts, products)}
        />
      </td>
    </tr>
  );
};

export default DesktopRow;
