import React from "react";

const Card = ({ unit, containsText, index }) => {
  return (
    <div
      key={unit._id || index}
      className="border-l-4 border-blue-500 pl-4 relative"
    >
      <div className="absolute -left-2 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>

      <h3 className="text-md font-medium mb-1">
        {unit.level === 1 ? "🧱" : index === 1 ? "📦" : "🧊"} 1 {unit.unitName}
      </h3>

      {containsText && <p className="text-sm text-gray-600">{containsText}</p>}

      <ul className="text-sm text-gray-700 mt-1 space-y-1">
        <li>
          🔢 Stock: {unit.totalQuantity} {unit.unitName}(s)
        </li>
        <li>💰 Cost: ₹{unit.unitCost}</li>
        <li>🏷️ Selling Price: ₹{unit.unitSellingPrice}</li>
        <li>📈 Margin: {unit.unitSellingPercentage}%</li>
      </ul>
    </div>
  );
};

export default Card;
