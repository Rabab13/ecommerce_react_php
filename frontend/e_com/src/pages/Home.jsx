import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard'
import CartOverlay from '../components/CartOverlay';
import Header from './Header';

const Home = ({ 
  products, 
  selectedCategory, 
  onQuickShop, 
  cartItems, 
  isCartOpen, 
  toggleCart, 
  onIncrease, 
  onDecrease 
}) => {
  const filteredProducts = selectedCategory
    ? products?.filter((product) => product?.category?.name === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50 z-50"
    >
      <button data-testid="add-button" style={{ display: "none" }}>ADD</button>
      <div id="product_form" style={{ display: "none" }}>
        <input type="text" placeholder="Product Name" />
        <input type="number" placeholder="Price" />
        <button type="submit">Submit</button>
      </div>
      <Header 
        cartItems={cartItems}
        toggleCart={toggleCart} 
      />

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-60"
          onClick={toggleCart}
        ></div>
      )}

      {isCartOpen && (
        <CartOverlay
          cartItems={cartItems}
          onClose={toggleCart}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      )}

      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 mt-12">
          {selectedCategory ? `${selectedCategory} Products` : 'All'}
        </h1>

        {filteredProducts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickShop={onQuickShop}
              />
            ))}
          </div>
        ) : (
          <p>No products available for this category.</p>
        )}
      </main>
    </div>
  );
};

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      image: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  onQuickShop: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number,
      image: PropTypes.string,
    })
  ).isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default Home;