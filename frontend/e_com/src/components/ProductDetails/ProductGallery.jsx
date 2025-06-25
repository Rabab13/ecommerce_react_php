import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductGallery = ({ gallery }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full" data-testid="product-gallery">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-visible">
        {gallery.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Thumbnail ${index}`}
            className={`w-16 md:w-20 h-16 md:h-20 object-contain rounded cursor-pointer transition-transform transform hover:scale-110 ${
              index === currentImageIndex ? 'border-2 border-green-600' : ''
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full">
        <img
          src={gallery[currentImageIndex].image_url}
          alt="Main product"
          className="w-full h-auto object-contain"
        />
        <button
          onClick={() =>
            setCurrentImageIndex((i) =>
              i === 0 ? gallery.length - 1 : i - 1
            )
          }
          className="absolute left-2 top-1/2 bg-black bg-opacity-75 text-white w-8 h-8 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((i) =>
              i === gallery.length - 1 ? 0 : i + 1
            )
          }
          className="absolute right-2 top-1/2 bg-black bg-opacity-70 text-white w-8 h-8 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductGallery;