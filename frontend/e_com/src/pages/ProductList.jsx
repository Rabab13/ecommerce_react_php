import ProductCard from '../components/ProductCard';
import PropTypes from 'prop-types';

const ProductList = ({ products, onQuickShop }) => {
  if (!products?.length) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mb-4 mt-16">
      {products.map((product) => {
        // Convert product name to kebab case
        const productNameKebabCase = product.name
          .toLowerCase() // Convert to lowercase
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, ''); // Remove special characters

        return (
          <ProductCard
            key={product.id}
            product={product}
            onQuickShop={onQuickShop}
            data-testid={`product-${productNameKebabCase}`} 
          />
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onQuickShop: PropTypes.func.isRequired,
};

export default ProductList;