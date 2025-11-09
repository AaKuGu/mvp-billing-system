import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";
import { handleDelete } from "../funcs";

const MobileCard = ({ p, index, setProducts, products }) => {
  const mainUnit = p.units?.[0];
  const profit = mainUnit ? mainUnit.unitSellingPrice - mainUnit.unitCost : 0;
  const isLowStock = mainUnit?.totalQuantity <= 10;
  const isOutOfStock = mainUnit?.totalQuantity === 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">
              #{index + 1}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isOutOfStock
                  ? "bg-red-100 text-red-700"
                  : isLowStock
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isLowStock
                ? "Low Stock"
                : "In Stock"}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 text-base">{p.productName}</h3>
        </div>
      </div>

      {/* Stock Info */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-xs text-gray-500 mb-0.5">Current Stock</p>
          <p className="text-lg font-bold text-gray-800">
            {mainUnit?.totalQuantity || 0}
          </p>
          <p className="text-xs text-gray-500">{mainUnit?.unitName}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-2.5">
          <p className="text-xs text-gray-500 mb-0.5">Profit/Unit</p>
          <p className="text-lg font-bold text-purple-700">
            ₹{profit.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            {((profit / mainUnit?.unitCost) * 100).toFixed(1)}% margin
          </p>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Cost Price</p>
          <p className="text-sm font-semibold text-gray-700">
            {mainUnit?.unitCost
              ? `₹${mainUnit.unitCost.toLocaleString()}`
              : "-"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Selling Price</p>
          <p className="text-sm font-semibold text-green-700">
            {mainUnit?.unitSellingPrice
              ? `₹${mainUnit.unitSellingPrice.toLocaleString()}`
              : "-"}
          </p>
        </div>
      </div>

      <ViewUpdateDelete
        actions={{
          view: `/go/products/${p._id}`,
          update: `/go/products/update/${p._id}`,
          delete: true, // presence of `delete` triggers button
        }}
        onDelete={() => handleDelete(p._id, setProducts, products)}
      />
    </div>
  );
};

export default MobileCard;
