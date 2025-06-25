// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import parse from 'html-react-parser';
// import { useQuery } from '@apollo/client';
// import { GET_PRODUCT_BY_ID } from '../graphql/queries'; 

// const ProductDetails = ({ onAddToCart, setActiveCategory }) => {
//   const { id } = useParams();
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
//     variables: { id },
//   });

//   const selectedProduct = data?.product;

//   useEffect(() => {
//     if (selectedProduct) {
//       const catName =
//         typeof selectedProduct.category === 'object'
//           ? selectedProduct.category.name
//           : selectedProduct.category;
//       setActiveCategory(catName);
//     }
//   }, [selectedProduct, setActiveCategory]);

//   const handleAttributeSelect = (attributeId, value) => {
//     setSelectedAttributes((prev) => ({ ...prev, [attributeId]: value }));
//   };

//   const allAttributesSelected = selectedProduct?.attributes?.every(
//     (attr) => selectedAttributes[attr.id]
//   );

//   const handleAddToCartClick = () => {
//     if (!selectedProduct?.inStock) {
//       alert('This product is out of stock.');
//       return;
//     }

//     if (!allAttributesSelected) {
//       alert('Please select all required attributes.');
//       return;
//     }

//     const productToAdd = {
//       ...selectedProduct,
//       selectedAttributes,
//       uniqueId: `${selectedProduct.id}-${JSON.stringify(selectedAttributes)}`,
//     };

//     onAddToCart(productToAdd);
//   };

//   if (loading) return <p>Loading product...</p>;
//   if (error || !selectedProduct) return <p>Product not found.</p>;

//   return (
//     <div className="flex justify-center items-center p-5 mt-10">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 bg-white w-full max-w-7xl mx-auto pt-5">
//         {/* Image Gallery */}
//         <div className="flex flex-col md:flex-row gap-4 w-full" data-testid="product-gallery">
//           {/* Thumbnails */}
//           <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-visible">
//             {selectedProduct.gallery.map((image, index) => (
//               <img
//                 key={index}
//                 src={image.image_url}
//                 alt={`Thumbnail ${index}`}
//                 className={`w-16 md:w-20 h-16 md:h-20 object-contain rounded cursor-pointer transition-transform transform hover:scale-110 ${
//                   index === currentImageIndex ? 'border-2 border-green-600' : ''
//                 }`}
//                 onClick={() => setCurrentImageIndex(index)}
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="relative w-full">
//             <img
//               src={selectedProduct.gallery[currentImageIndex].image_url}
//               alt={selectedProduct.name}
//               className="w-full h-auto object-contain "
//             />
//             <button
//               onClick={() =>
//                 setCurrentImageIndex((i) =>
//                   i === 0 ? selectedProduct.gallery.length - 1 : i - 1
//                 )
//               }
//               className="absolute left-2 top-1/2 bg-black bg-opacity-75 text-white w-8 h-8 flex items-center justify-center"
//             >
//                <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2} // Thin stroke
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentImageIndex((i) =>
//                   i === selectedProduct.gallery.length - 1 ? 0 : i + 1
//                 )
//               }
//               className="absolute right-2 top-1/2 bg-black bg-opacity-70 text-white w-8 h-8 flex items-center justify-center "
//             >
//                <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2} 
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col w-full space-y-4">
//           <h2 className="font-raleway font-semibold text-[30px] leading-[27px] text-2xl md:text-3xl">
//             {selectedProduct.name}
//           </h2>

//           {selectedProduct.attributes.map((attr) => {
//             const kebab = attr.name.toLowerCase().replace(/\s+/g, '-');

//             return (
//               <div key={attr.id}>
//                 <h3 className="font-roboto-condensed font-bold uppercase">{attr.name}:</h3>
//                 <div className="text-lg font-roboto-condensed p-1 flex gap-2 flex-wrap">
//                   {attr.items.map((item) => {
//                     const isSelected = selectedAttributes[attr.id] === item.id;

//                     if (attr.name === 'Color') {
//                       return (
//                         <div
//                           key={item.id}
//                           onClick={() => handleAttributeSelect(attr.id, item.id)}
//                           className="relative w-9 h-9 cursor-pointer"
//                           data-testid={`product-attribute-${kebab}-${item.value}${
//                             isSelected ? '-selected' : ''
//                           }`}
//                         >
//                           {/* Outer border */}
//                           <div
//                             className={`absolute inset-0 rounded-sm border ${
//                               isSelected ? 'border-[#5ECE7B]' : 'border-transparent'
//                             }`}
//                           />
//                           {/* Inner color box */}
//                           <div
//                             className="absolute w-8 h-8 rounded-sm"
//                             style={{ backgroundColor: item.value,
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',}}
//                           />
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <button
//                           key={item.id}
//                           onClick={() => handleAttributeSelect(attr.id, item.id)}
//                           className={`border w-[63px] h-[45px] ${
//                             isSelected ? 'bg-black text-white' : 'bg-white text-black'
//                           }`}
//                           data-testid={`product-attribute-${kebab}-${item.value}`}
//                         >
//                           {item.value}
//                         </button>
//                       );
//                     }
//                   })}
//                 </div>
//               </div>
//             );
//           })}

//           <div>
//             <h3 className="font-roboto-condensed pb-3 font-bold uppercase">Price:</h3>
//             {selectedProduct.prices.map((price) => (
//               <p
//                 key={price.currency.label}
//                 className="font-raleway pb-3 font-bold text-[24px] leading-[18px] text-lg md:text-xl text-black-600"
//               >
//                 {price.currency.symbol}
//                 {price.amount.toFixed(2)}
//               </p>
//             ))}
//           </div>

//           <button
//             onClick={handleAddToCartClick}
//             disabled={!allAttributesSelected || !selectedProduct.inStock}
//             className={`font-raleway font-semibold text-[16px] leading-[120%] text-center uppercase flex items-center justify-center w-full md:w-72 py-3 text-white transition-all duration-200 ${
//               !allAttributesSelected || !selectedProduct.inStock
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-green-600 hover:bg-green-700'
//             }`}
//           >
//             {!selectedProduct.inStock ? 'Out of Stock' : 'Add to Cart'}
//           </button>

//           <div className="w-[300px] h-[200px] pt-3 md:w-72 overflow-y-auto font-roboto font-normal text-[16px] leading-[160%] text-gray-700 prose prose-sm">
//             {parse(selectedProduct.description)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductDetails.propTypes = {
//   onAddToCart: PropTypes.func.isRequired,
//   setActiveCategory: PropTypes.func.isRequired,
// };

// export default ProductDetails;
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