import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const ProductDetails = ({ onAddToCart, setActiveCategory, products }) => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the product when the component mounts or when `products` or `id` changes
  useEffect(() => {
    if (products && id) {
      const product = products.find((p) => p.id.toString() === id);
      setSelectedProduct(product);
      if (product) {
        const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
        setActiveCategory(categoryName);
      }
    }
  }, [products, id, setActiveCategory]);

  // Handle attribute selection
  const handleAttributeSelect = (attributeId, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeId]: value }));
  };

  // Check if all attributes are selected
  const allAttributesSelected =
    selectedProduct?.attributes?.every((attr) => selectedAttributes[attr.id]);

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (!selectedProduct?.inStock) {
      alert('This product is out of stock.');
      return;
    }

    if (!allAttributesSelected) {
      alert('Please select all required attributes.');
      return;
    }

    const productToAdd = {
      ...selectedProduct,
      selectedAttributes,
      uniqueId: `${selectedProduct.id}-${JSON.stringify(selectedAttributes)}`,
    };

    onAddToCart(productToAdd);
  };

  // Handle image navigation
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.gallery.length - 1 : prevIndex - 1
    );
  };

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex justify-center items-center p-5 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 bg-white w-full max-w-6xl">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4" data-testid="product-gallery">
          {/* Thumbnails */}
          <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3">
            {selectedProduct.gallery.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-contain rounded cursor-pointer transition-transform transform hover:scale-110 ${
                  index === currentImageIndex ? 'border-2 border-green-600' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Main Image with Navigation Arrows */}
          <div className="relative w-full" style={{ maxWidth: '976px', maxHeight: '541px' }}>
            <img
              src={selectedProduct.gallery[currentImageIndex].image_url}
              alt={selectedProduct.name}
              className="w-full h-full object-contain"
            />
            {/* Left Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 w-[32px] h-[32px] top-1/2 bg-black text-white  hover:bg-opacity-75"
            >
              &#10094;
            </button>
            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 w-[32px] h-[32px] bg-black text-white hover:bg-opacity-75"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col w-[500px] space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{selectedProduct.name}</h2>

          {/* Attributes */}
          {selectedProduct.attributes.map((attr) => {
            const attributeNameKebabCase = attr.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={attr.id} className="mb-3" data-testid={`product-attribute-${attributeNameKebabCase}`}>
                <h3 className="text-lg mb-2 font-medium text-gray-700" style={{ textTransform: 'uppercase' }}>
                  {attr.name}:
                </h3>
                <div className="flex gap-1">
                  {attr.items.map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center justify-center border transition-all duration-200 ${
                        selectedAttributes[attr.id] === item.id
                          ? attr.name === 'Color'
                            ? 'border-green-600'
                            : 'bg-black  border-black text-white'
                          : 'border-gray-300 hover:bg-gray-200'
                      }`}
                      style={{
                        width: attr.name === 'Capacity' ? '65px' : attr.name === 'Color' ? '28px' : attr.name === 'Size' ? '50px': '63px',
                        height: attr.name === 'Color' ? '30px' : '45px',
                      }}
                      onClick={() => handleAttributeSelect(attr.id, item.id)}
                      data-testid={`product-attribute-${attributeNameKebabCase}-${item.value.replace(/#/g, '')}`} // Example: product-attribute-color-44FF03
                    >
                      {attr.name === 'Color' ? (
                        <span
                          className="w-6 h-6 inline-block"
                          style={{ backgroundColor: item.value }}
                        ></span>
                      ) : (
                        item.value || 'N/A'
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-gray-700" style={{ textTransform: 'uppercase' }}>Price:</h3>
            {selectedProduct.prices.map((price) => (
              <p key={price.currency.label} className="text-xl font-bold text-green-600">
                {price.currency.symbol}{price.amount.toFixed(2)}
              </p>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!allAttributesSelected || !selectedProduct.inStock}
            className={`w-60 py-3 font-medium text-white transition-all duration-200 ${
              allAttributesSelected && selectedProduct.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            style={{ textTransform: 'uppercase' }}
            data-testid="add-to-cart"
          >
            {!selectedProduct.inStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Description */}
          <div className="mt-4" data-testid="product-description">
            <div
              className="description text-gray-600 overflow-y-auto"
              style={{ maxHeight: '200px' }}
            >
              {parse(selectedProduct.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductDetails;