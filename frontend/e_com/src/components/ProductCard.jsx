import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onQuickShop }) => {
  const { name, prices, gallery, inStock, attributes } = product;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!product) {
    return null; // Avoid rendering if product is undefined
  }

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Function to get default attributes
  const getDefaultAttributes = () => {
    const defaultAttributes = {};
    if (attributes && attributes.length > 0) {
      attributes.forEach((attr) => {
        if (attr.items && attr.items.length > 0) {
          defaultAttributes[attr.id] = attr.items[0].id; // Set the first item as default
          
        }
      });
    }
    return defaultAttributes;
    
  };
  

  const handleQuickShop = (e) => {
    e.stopPropagation(); // Prevent navigation to the product page
  
    if (typeof onQuickShop === 'function') {
      // Generate default attributes for this product
      const defaultAttributes = getDefaultAttributes();
  
      // Create the product object with default attributes
      const productWithDefaults = {
        ...product,
        selectedAttributes: defaultAttributes,
        uniqueId: `${product.id}-${JSON.stringify(defaultAttributes)}`,
      };
  
      // Fire the Quick Shop handler (assumed to handle add to cart + open cart)
      onQuickShop(productWithDefaults);
      
    } else {
      console.error('onQuickShop is not a function');
    }
  };

  return (
    <div
      data-testid={`product-${name.toLowerCase().replace(/\s+/g, '-')}`}
      className="relative p-4 w-[386px] h-[444px] bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative overflow-visible">
        {/* Image with gray overlay for out-of-stock products */}
        <div className={`relative ${!inStock ? ' bg-opacity-70' : ''}`}>
          <img
            src={gallery?.[0]?.image_url}
            alt={name}
            className={`w-[354px] h-[330px] object-contain ${!inStock ? 'opacity-50' : ''}`}
          />
        </div>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-500">OUT OF STOCK</span>
          </div>
        )}

        {isHovered && inStock && (
          <button
            onClick={handleQuickShop}
            className="absolute -bottom-6 right-0 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-20"
            aria-label="Add to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 6M7 13l-1.6 4M7 13h10m-1 8a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-5 flex justify-between items-center">
        <div className="text-left">
          <h3 className="text-md font-medium text-gray-800">{name}</h3>
          {/* Price with gray overlay for out-of-stock products */}
          <div className={`${!inStock ? 'bg-gray-50 bg-opacity-70' : ''}`}>
            <p className={`text-lg font-semibold ${!inStock ? 'text-gray-500' : ''}`}>
              {prices?.[0]?.amount ? `$${prices[0].amount.toFixed(2)}` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.shape({
          label: PropTypes.string.isRequired,
          symbol: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        image_url: PropTypes.string.isRequired,
      })
    ).isRequired,
    inStock: PropTypes.bool.isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ),
  }).isRequired,
  onQuickShop: PropTypes.func.isRequired,
};

export default ProductCard;