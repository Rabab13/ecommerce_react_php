import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';
import ProductGallery from '../components/ProductDetails/ProductGallery';
import ProductAttributes from '../components/ProductDetails/ProductAttributes';
import ProductPrice from '../components/ProductDetails/ProductPrice'; 
import AddToCartButton from '../components/ProductDetails/AddToCartButton';
import ProductDescription from '../components/ProductDetails/ProductDescription';

const ProductDetails = ({ onAddToCart, setActiveCategory }) => {
  const { id } = useParams();
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const selectedProduct = data?.product;

  useEffect(() => {
    if (selectedProduct) {
      const catName =
        typeof selectedProduct.category === 'object'
          ? selectedProduct.category.name
          : selectedProduct.category;
      setActiveCategory(catName);
    }
  }, [selectedProduct, setActiveCategory]);

  const handleAttributeSelect = (attributeId, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeId]: value }));
  };

  const allAttributesSelected = selectedProduct?.attributes?.every(
    (attr) => selectedAttributes[attr.id]
  );

  const handleAddToCartClick = () => {
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

  if (loading) return <p>Loading product...</p>;
  if (error || !selectedProduct) return <p>Product not found.</p>;

  return (
    <div className="flex justify-center items-center p-5 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 bg-white w-full max-w-7xl mx-auto pt-5">
        <ProductGallery gallery={selectedProduct.gallery} />
        
        <div className="flex flex-col w-full space-y-4">
          <h2 className="font-raleway font-semibold text-[30px] leading-[27px] text-2xl md:text-3xl">
            {selectedProduct.name}
          </h2>

          <ProductAttributes
            attributes={selectedProduct.attributes}
            selectedAttributes={selectedAttributes}
            onSelectAttribute={handleAttributeSelect}
          />

          <ProductPrice prices={selectedProduct.prices} />

          <AddToCartButton
            inStock={selectedProduct.inStock}
            allAttributesSelected={allAttributesSelected}
            onAddToCart={handleAddToCartClick}
          />

          <ProductDescription description={selectedProduct.description} />
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
};

export default ProductDetails;