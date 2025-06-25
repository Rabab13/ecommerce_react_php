import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { INSERT_ORDER_MUTATION } from '../../graphql/queries';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartOverlay = ({
  cartItems = [],
  onClose,
  onIncrease,
  onDecrease,
  onPlaceOrder,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const total = cartItems.reduce((acc, item) => {
    if (!item.prices || item.prices.length === 0) {
      console.warn(`Warning: Item ${item.id} has no price defined.`);
      return acc; 
    }
    return acc + item.prices[0].amount * (item.quantity || 0);
  }, 0);

  const currency = cartItems.length > 0 ? cartItems[0].prices[0].currency.label : 'USD';
  const [insertOrder] = useMutation(INSERT_ORDER_MUTATION);

  const handlePlaceOrder = async () => {
    try {
      const items = cartItems
        .filter(item => item.prices && item.prices.length > 0)
        .map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.prices[0].amount,
          attributes: item.attributes.map((attr) => ({
            name: attr.name,
            value: attr.items.find((i) => i.id === item.selectedAttributes[attr.id])?.value || '',
          })),
        }));

      const response = await insertOrder({
        variables: {
          input: {
            total_amount: total,  
            currency,
            items,
          },
        },
      });

      console.log("Mutation response:", response);
      onPlaceOrder();
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const cartOverlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartOverlayRef.current && !cartOverlayRef.current.contains(event.target)) {
        const cartButton = document.querySelector('[data-testid="cart-btn"]');
        if (!cartButton || !cartButton.contains(event.target)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="font-raleway  absolute top-8 lg:right-60 right-8 w-80 bg-white p-2 pt-14 shadow-xl z-50 " ref={cartOverlayRef}>
      <CartHeader totalItems={totalItems} onClose={onClose} />
      
      <div className="max-h-96 overflow-y-auto">
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem 
                key={item.uniqueId} 
                item={item} 
                onIncrease={onIncrease} 
                onDecrease={onDecrease} 
              />
            ))}
          </div>
        ) : (
          <p className="font-roboto font-semibold text-center text-gray-500">Your bag is empty.</p>
        )}
      </div>

      <CartTotal 
        total={total} 
        cartItems={cartItems} 
        onPlaceOrder={handlePlaceOrder} 
      />
    </div>
  );
};

CartOverlay.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      prices: PropTypes.array.isRequired,
      quantity: PropTypes.number,
      image: PropTypes.string,
      attributes: PropTypes.array,
      uniqueId: PropTypes.string.isRequired,
      selectedAttributes: PropTypes.object,
    })
  ),
  onClose: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default CartOverlay;