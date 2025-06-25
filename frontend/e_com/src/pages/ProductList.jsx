import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

const ProductList = ({ products, onQuickShop, category, loading, error }) => {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;
  if (!products?.length) {
    return (
      <>
        <h1 className="text-2xl mb-5">{category?.toUpperCase() || 'ALL'}</h1>
        <p>No products available.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="font-raleway font-normal text-2xl mb-5">{category?.toUpperCase() || 'ALL'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mb-4 mt-8">
        {products.map((product) => {
          const productNameKebabCase = product.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

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
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onQuickShop: PropTypes.func.isRequired,
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ProductList;
