import DesktopRow from "./DesktopRow";

// Main Component
const DesktopListingCard = ({
  p = sampleProduct,
  index = 0,
  onDelete,
  products,
  setProducts,
}) => {
  return (
    <>
      {/* Desktop View (hidden on mobile) */}
      <DesktopRow
        p={p}
        index={index}
        onDelete={onDelete}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};

export default DesktopListingCard;