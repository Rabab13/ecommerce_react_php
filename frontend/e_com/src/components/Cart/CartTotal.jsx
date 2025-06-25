import PropTypes from 'prop-types';

const CartTotal = ({ 
  total, 
  cartItems, 
  onPlaceOrder 
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between text-base font-bold font-roboto-condensed leading-[25.6px] tracking-normal text-right">
        <span className='font-roboto'>Total</span>
        <span className="font-raleway font-bold" data-testid="cart-total">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={onPlaceOrder}
        disabled={cartItems.length === 0}
        className={`w-full mt-6 py-3 ${
          cartItems.length === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          data-testid="place-order-button" 
      >
        PLACE ORDER
      </button>
    </div>
  );
};

CartTotal.propTypes = {
  total: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default CartTotal;