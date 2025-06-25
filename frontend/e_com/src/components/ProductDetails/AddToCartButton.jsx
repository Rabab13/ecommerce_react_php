import PropTypes from 'prop-types';

const AddToCartButton = ({ 
  inStock, 
  allAttributesSelected, 
  onAddToCart 
}) => {
  const isDisabled = !allAttributesSelected || !inStock;

  return (
    <button
      onClick={onAddToCart}
      disabled={isDisabled}
      className={`font-raleway font-semibold text-[16px] leading-[120%] text-center uppercase flex items-center justify-center w-full md:w-72 py-3 text-white transition-all duration-200 ${
        isDisabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
      }`}
      data-testid="add-to-cart"  // Add this line
      aria-disabled={isDisabled}  // For better accessibility
    >
      {!inStock ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
};

AddToCartButton.propTypes = {
  inStock: PropTypes.bool.isRequired,
  allAttributesSelected: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default AddToCartButton;