import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const ProductDetails = ({ onAddToCart, setActiveCategory, products }) => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleAttributeSelect = (attributeId, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeId]: value }));
  };

  const allAttributesSelected =
    selectedProduct?.attributes?.every((attr) => selectedAttributes[attr.id]);

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
    return <p className="text-center p-4">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        {/* Image Gallery - Mobile First */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
          {/* Thumbnails - Horizontal on mobile, Vertical on larger screens */}
          <div className="flex flex-row sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible sm:w-20">
            {selectedProduct.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-full sm:h-20 border rounded ${
                  index === currentImageIndex ? 'border-2 border-green-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={image.image_url}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-square sm:aspect-auto sm:h-[400px] lg:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={selectedProduct.gallery[currentImageIndex].image_url}
              alt={selectedProduct.name}
              className="w-full h-full object-contain p-4"
            />
            
            {/* Navigation Arrows */}
            {selectedProduct.gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:max-w-md xl:max-w-lg space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {selectedProduct.name}
          </h2>

          {/* Attributes */}
          {selectedProduct.attributes.map((attr) => {
            const attributeNameKebabCase = attr.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={attr.id} className="mb-3" data-testid={`product-attribute-${attributeNameKebabCase}`}>
                <h3 className="text-lg mb-2 font-medium text-gray-700" style={{ textTransform: 'uppercase' }}>
                  {attr.name}:
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {attr.items.map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center justify-center border rounded transition-all ${
                        selectedAttributes[attr.id] === item.id
                          ? attr.name === 'Color'
                            ? 'ring-2 ring-green-600'
                            : 'bg-black text-white border-black'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                      style={{
                        minWidth: attr.name === 'Capacity' ? '65px' : attr.name === 'Color' ? '32px' : '44px',
                        height: attr.name === 'Color' ? '32px' : '44px',
                        ...(attr.name === 'Color' && { backgroundColor: item.value }),
                      }}
                      onClick={() => handleAttributeSelect(attr.id, item.id)}
                    >
                      {attr.name !== 'Color' && item.value}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Pricing */}
          <div className="mt-6">
            <h3 className="text-base md:text-lg font-medium text-gray-700 uppercase">Price:</h3>
            {selectedProduct.prices.map((price) => (
              <p key={price.currency.label} className="text-xl md:text-2xl font-bold text-green-600 mt-1">
                {price.currency.symbol}{price.amount.toFixed(2)}
              </p>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!allAttributesSelected || !selectedProduct.inStock}
            className={`w-full md:w-64 py-3 px-6 font-medium text-white rounded transition-all ${
              allAttributesSelected && selectedProduct.inStock
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {!selectedProduct.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>

          {/* Description */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Description</h3>
            <div className="prose max-w-none text-gray-600">
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