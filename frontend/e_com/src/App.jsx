import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './pages/Header';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CartOverlay from './components/Cart/CartOverlay';
import { GET_PRODUCTS, GET_CATEGORIES } from './graphql/queries';
import { useQuery } from '@apollo/client';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isOnProductDetailsPage = location.pathname.startsWith('/product/');

  // Fetch categories
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES,
    {fetchPolicy: 'network-only',}
  );

  // Fetch products based on the active category
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS, {
    variables: {
      categoryId: activeCategory === 'all' ?
       null : categoriesData?.categories.find((cat) => cat?.name?.toLowerCase() === activeCategory?.toLowerCase())?.id || null,
      categoryName: activeCategory === 'all' ? null : activeCategory,
      fetchPolicy: 'network-only',
    },
    skip: !categoriesData,
  });

  // Load/save cart items from/to local storage
 useEffect(() => {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
}, []);



 useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  // Update active category based on route
  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'all';
    setActiveCategory(path);
  }, [location.pathname]);

  // Handle adding to cart
  const handleAddToCart = (product) => {
    const uniqueId = `${product.id}-${JSON.stringify(product.selectedAttributes)}`;

    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.uniqueId === uniqueId);
      
      if (existingItemIndex !== -1) {
        return prevCartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, {
          ...product,
          image: product.gallery?.[0]?.image_url || 'path/to/fallback/image.png',
          quantity: 1,
          uniqueId,
          selectedAttributes: product.selectedAttributes,
        }];
      }
    });

    setIsCartOpen(true);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };


  
  if (!isOnProductDetailsPage && (categoriesLoading || productsLoading)) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl animate-pulse">Loading...</p>
          </div>
  );
}
  
if (!isOnProductDetailsPage && (categoriesError || productsError)) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl text-red-500">Error loading data. Please try again later.</p>
       </div>
  );
}

  const products = productsData?.productsByCategory || [];
  const categories = categoriesData?.categories || [];


  return (
    <div className="App">
      <Header
        cartItems={cartItems}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={(categoryName) => {
          setActiveCategory(categoryName);
          navigate(categoryName === 'all' ? '/' : `/${categoryName}`);
        }}
        toggleCart={toggleCart}
      />

      <main className="max-w-7xl mx-auto p-4 pt-24">
        <Routes>
  <Route
    path="/"
    element={
      <ProductList
        products={products}
        loading={productsLoading}
        error={productsError}
        onQuickShop={handleAddToCart}
        category="all"
      />
    }
  />
  {categories.map((category) => (
    <Route
      key={category.id}
      path={`/${category.name}`}
      element={
        <ProductList
          products={products}
          onQuickShop={handleAddToCart}
          category={category.name}
        />
      }
    />
  ))}
  <Route
    path="/product/:id"
    element={
      <ProductDetails
        setActiveCategory={setActiveCategory}
        onAddToCart={handleAddToCart}
        products={products}
      />
    }
  />
</Routes>

      </main>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div 
          data-testid="cart-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleBackdropClick}
        >
          <div 
            className="absolute right-0 h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CartOverlay
              cartItems={cartItems}
              onClose={toggleCart}
              onIncrease={(uniqueId) => {
                setCartItems(prevCartItems =>
                  prevCartItems.map(item =>
                    item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
                  )
                );
              }}
              onDecrease={(uniqueId) => {
                setCartItems(prevCartItems =>
                  prevCartItems
                    .map(item =>
                      item.uniqueId === uniqueId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
                    )
                    .filter(item => item.quantity > 0)
                );
              }}
              onPlaceOrder={() => {
                setCartItems([]);
                localStorage.removeItem('cartItems');
                setIsCartOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;