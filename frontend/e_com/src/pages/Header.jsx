import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import cart from '../assets/cart.svg';
import home from '../assets/home.svg';

const Header = ({
  categories = [],
  activeCategory = 'all',
  onCategoryClick,
  cartItems = [],
  toggleCart,
}) => {
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (categoryName) => {
    onCategoryClick(categoryName);
    navigate(`/${categoryName}`);
  };

  const handleHomeClick = () => {
    onCategoryClick('all');
    navigate('/');
  };

  const normalizedActiveCategory = activeCategory.toLowerCase();

  return (
    <header className="w-full bg-white fixed  top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 pt-2 flex items-center justify-between relative">
        <nav className="flex space-x-4 sm:space-x-8">
          {/* ALL link */}
          <Link
            to="/all"
            className={`text-base sm:text-lg pb-2 transition-colors uppercase ${
              normalizedActiveCategory === 'all'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-700 hover:text-green-500'
            }`}
            data-testid={
              normalizedActiveCategory === 'all'
                ? 'active-category-link'
                : 'all-category-link'
            }
          >
            ALL
          </Link>

          {/* Category links */}
          {categories.map((category) => {
            if (category.name.toLowerCase() === 'all') return null;

            return (
              <Link
                key={category.id}
                to={`/${category.name.toLowerCase()}`}
                className={`text-base sm:text-lg pb-2 transition-colors uppercase ${
                  category.name.toLowerCase() === normalizedActiveCategory
                    ? 'text-green-500 border-b-2 border-green-500'
                    : 'text-gray-700 hover:text-green-500'
                }`}
                onClick={() => handleCategoryClick(category.name)}
                aria-label={`Select category ${category.name}`}
                data-testid={
                  category.name.toLowerCase() === normalizedActiveCategory
                    ? 'active-category-link'
                    : 'category-link'
                }
              >
                {category.name.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        {/* Home button - Centered on large screens */}
        <button
          onClick={handleHomeClick}
          className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 p-2 rounded-full transition hover:bg-gray-100"
          aria-label="Navigate to Home"
        >
          <img src={home} alt="Home Icon" className="w-8 h-8" />
        </button>

        {/* Right side buttons - Home (mobile) and Cart */}
        <div className="flex p-0 items-center space-x-4">
          <button
            onClick={handleHomeClick}
            className="lg:hidden p-2 rounded-full transition hover:bg-gray-100"
            aria-label="Navigate to Home"
          >
            <img src={home} alt="Home Icon" className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Cart button */}
          <button
            onClick={toggleCart}
            data-testid="cart-btn"
            className="relative p-2  text-gray-700 hover:text-green-500"
            aria-label="Open Cart"
          >
            <img src={cart} alt="Cart Icon" className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
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