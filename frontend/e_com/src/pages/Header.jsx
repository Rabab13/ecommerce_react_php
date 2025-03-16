import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.svg';
import home from '../assets/home.svg';

const Header = ({
  categories = [],
  activeCategory = '',
  onCategoryClick,
  cartItems = [],
  toggleCart,
}) => {
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (categoryName) => {
    // console.log(`Category clicked: ${categoryName}`); // Debugging
    onCategoryClick(categoryName);
    navigate(categoryName === 'all' ? '/' : `/${categoryName}`);
  };

  const handleHomeClick = () => {
    // console.log('Home icon clicked'); // Debugging
    onCategoryClick('all');
    navigate('/');
  };

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center pl-4">
        <nav className="flex space-x-8">
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`text-lg pb-8 transition-colors uppercase ${
                category.name.toLowerCase() === activeCategory.toLowerCase()
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-700 hover:text-green-500'
              }`}
              onClick={() => handleCategoryClick(category.name)}
              aria-label={`Select category ${category.name}`}
              data-testid={
                category.name.toLowerCase() === activeCategory.toLowerCase()
                  ? 'active-category-link'
                  : 'category-link'
              }
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleHomeClick}
            className="p-2 rounded-full transition"
            aria-label="Navigate to Home"
          >
            <img src={home} alt="Home Icon" className="w-10 h-10" />
          </button>
        </div>

        <button
          data-testid="cart-btn"
          onClick={toggleCart}
          className="relative p-2 text-gray-700 hover:text-green-500"
          aria-label="Open Cart"
        >
          <img src={cart} alt="Cart Icon" className="w-5 h-5" />
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number,
      image: PropTypes.string,
    })
  ).isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default Header;
