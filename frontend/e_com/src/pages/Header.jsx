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
    <header className="w-full bg-white fixed top-0 left-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center">
    {/* Navigation */}
    <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-8 mb-2 sm:mb-0">
      {/* ALL link */}
      <Link
        to="/all"
        className={`text-base sm:text-lg pb-2 sm:pb-8 transition-colors uppercase ${
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
            className={`text-base sm:text-lg pb-2 sm:pb-8 transition-colors uppercase ${
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

    {/* Home button */}
    <div className="mb-2 sm:mb-0">
      <button
        onClick={handleHomeClick}
        className="p-2 rounded-full transition"
        aria-label="Navigate to Home"
      >
        <img src={home} alt="Home Icon" className="w-8 sm:w-10 h-8 sm:h-10" />
      </button>
    </div>

    {/* Cart */}
    <button
      onClick={toggleCart}
      data-testid="cart-btn"
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