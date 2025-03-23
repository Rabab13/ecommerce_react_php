import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
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
    onCategoryClick(categoryName);
    navigate(categoryName === 'all' ? '/' : `/${categoryName}`);
  };

  const handleHomeClick = () => {
    onCategoryClick('all');
    navigate('/');
  };

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center pl-4">
        <nav className="flex space-x-8">
          {/* Add the "All" link */}
          <Link
            to="/all"
            className={`text-lg pb-8 transition-colors uppercase ${
              activeCategory.toLowerCase() === 'all'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-700 hover:text-green-500'
            }`}
            data-testid="all-category-link"
          >
            ALL
          </Link>

          {/* Render other category links */}
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${category.name.toLowerCase()}`}
              className={`text-lg pb-8 transition-colors uppercase ${
                category.name.toLowerCase() === activeCategory.toLowerCase()
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-700 hover:text-green-500'
              }`}
              onClick={() => onCategoryClick(category.name)}
              aria-label={`Select category ${category.name}`}
              data-testid={
                category.name.toLowerCase() === activeCategory.toLowerCase()
                  ? 'active-category-link'
                  : 'category-link'
              }
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Cart button and other elements */}
        <button
          data-testid="cart-btn"
          onClick={toggleCart}
          className="relative p-2 text-gray-700 hover:text-green-500"
          aria-label="Open Cart"
        >
          <img src={cart} alt="Cart Icon" className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
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