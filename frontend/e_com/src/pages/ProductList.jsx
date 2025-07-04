import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

const ProductList = ({ products, onQuickShop, category, loading, error }) => {
  console.log(products )
  if (loading) {
  return (
    <div className="flex justify-center items-center h-48">
      <span className="text-lg text-gray-600 animate-pulse">Loading products...</span>
    </div>
  );
}
if (error) {
  return (
    <div className="flex justify-center items-center h-48">
      <span className="text-red-600 text-lg">Error loading products.</span>
    </div>
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
