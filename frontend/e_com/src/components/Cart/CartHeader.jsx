import PropTypes from 'prop-types';

const CartHeader = ({ 
  totalItems, 
  onClose 
}) => {
  return (
    <div className="font-raleway flex justify-between items-center">
        <h2 className="text-xl">
    <span className="text-base font-bold">My Bag</span>
    {`, `}
    <span className="text-base font-normal">
      {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
    </span>
  </h2>
      <button className="text-gray-500 hover:text-red-500" onClick={onClose}>
        {/* Close icon would go here */}
      </button>
    </div>
  );
};

CartHeader.propTypes = {
  totalItems: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartHeader;