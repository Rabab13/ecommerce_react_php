import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useMutation } from '@apollo/client';
import { INSERT_ORDER_MUTATION } from '../graphql/queries'
// Define the GraphQL mutation for inserting an order


const CartOverlay = ({
  cartItems = [],
  onClose,
  onIncrease,
  onDecrease,
  onPlaceOrder,
}) => {
 
 const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
 const total = cartItems.reduce((acc, item) => {
   const priceAmount = item.prices.length > 0 ? item.prices[0].amount : 0;
   return acc + priceAmount * (item.quantity || 0);
 }, 0);

  // Define the GraphQL mutation for inserting an order
  const [insertOrder] = useMutation(INSERT_ORDER_MUTATION);

  // Function to handle placing an order
  const handlePlaceOrder = async () => {
    try {
      const total_amount = cartItems.reduce((acc, item) => {
        if (!item.prices || item.prices.length === 0) {
          throw new Error(`Item ${item.id} has no prices defined.`);
        }
        return acc + item.prices[0].amount * (item.quantity || 0);
      }, 0);

      const currency = cartItems.length > 0 ? cartItems[0].prices[0].currency.label : 'USD';

      const items = cartItems.map((item) => ({
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
            total_amount,  // Pass the calculated total_amount
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

  // Ref for the CartOverlay container to detect clicks outside
  const cartOverlayRef = useRef(null);

  // Close CartOverlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartOverlayRef.current && !cartOverlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div   className="absolute top-14 right-56 w-80 bg-white p-2 pt-9 shadow-xl z-100 font-raleway" ref={cartOverlayRef}>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold">My Bag, {totalItems === 0 ? '0 Items' : totalItems === 1 ? '1 Item' : `X Items`}
        </h2>

        

        <button className="text-gray-500 hover:text-red-500" onClick={onClose}>
          {/* Close icon or text */}
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.uniqueId} className="flex items-start border-b pb-4">
                <div className="flex-1">
                  <h3 className="text-base mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.prices.length > 0
                      ? `${item.prices[0].currency.symbol}${item.prices[0].amount.toFixed(2)}`
                      : '$0.00'}
                  </p>

                  {/* Attributes */}
                  {item.attributes && item.attributes.map((attribute) => {
                    const attributeNameKebabCase = attribute.name.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <div key={attribute.id} className="mt-2" data-testid={`cart-item-attribute-${attributeNameKebabCase}`}>
                        <span className="text-xs p-2 font-medium">{attribute.name}:</span>
                        <div className="flex gap-1 mt-1">
                          {attribute.items.map((itemValue) => {
                            const isSelected = itemValue.id === (item.selectedAttributes || {})[attribute.id];
                            const itemValueKebabCase = itemValue.value.toLowerCase().replace(/\s+/g, '-');
                            return (
                              <div
                                key={itemValue.id}
                                className={`flex p-2 items-center justify-center border ${
                                  isSelected && attribute.name !== 'Color' ? 'bg-black text-white' : 'bg-transparent border-gray-300'
                                } ${attribute.name === 'Color' && isSelected ? 'border-black' : ''}`}
                                style={{
                                  width: attribute.name === 'Capacity' ? '65px' : attribute.name === 'Color' ? '29px' : '37px',
                                  height: attribute.name === 'Capacity' ? '40px' : '31px',
                                  backgroundColor: attribute.name === 'Color' ? itemValue.value : 'bg-black',
                                  color: isSelected && attribute.name !== 'Color' ? 'white' : 'black',
                                }}
                                data-testid={`product-attribute-${attributeNameKebabCase}-${itemValueKebabCase}${
                                  isSelected ? '-selected' : ''
                                }`}
                              >
                                {attribute.name !== 'Color' && itemValue.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center justify-center mx-2 gap-7">
                  <button
                    onClick={() => onIncrease(item.uniqueId)}
                    className="px-2.5 border border-gray-300"
                    data-testid="cart-item-amount-increase"
                  >
                    +
                  </button>
                  <span data-testid="cart-item-amount">{item.quantity || 0}</span>
                  <button
                    onClick={() => onDecrease(item.uniqueId)}
                    className="px-2.5 border border-gray-300"
                    data-testid="cart-item-amount-decrease"
                  >
                    -
                  </button>
                </div>

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-30 object-contain mt-4"
                  onError={(e) => {
                    e.target.src = 'path/to/fallback/image.png';
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your bag is empty.</p>
        )}
      </div>

      {/* Cart Total and Place Order Button */}
      <div className="mt-6">
        <div className="flex justify-between text-base font-medium font-raleway leading-[25.6px] tracking-normal text-right">
          <span>Total</span>
          <span data-testid="cart-total">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className={`w-full mt-4 py-3 ${
            cartItems.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            data-testid="place-order-button" 
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

CartOverlay.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      prices: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          currency: PropTypes.shape({
            label: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      quantity: PropTypes.number,
      image: PropTypes.string,
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ),
      uniqueId: PropTypes.string.isRequired,
      selectedAttributes: PropTypes.object,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default CartOverlay;