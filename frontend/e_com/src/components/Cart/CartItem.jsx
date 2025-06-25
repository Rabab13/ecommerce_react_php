import PropTypes from 'prop-types';

const CartItem = ({ 
  item, 
  onIncrease, 
  onDecrease 
}) => {
  return (
    <div className="flex flex-row items-stretch pt-8 gap-2 w-full">
      {/* Left side - Product info */}
      <div className="flex flex-col gap-2 w-40">
        {/* Product title */}
        <div className="text-lg flex flex-col gap-1">
          <h3 className="font-raleway font-light text-lg leading-[160%] text-[#1D1F22]">
            {item.name}
          </h3>
          <p className="font-raleway font-normal text-base leading-[160%] text-[#1D1F22]">
            {item.prices.length > 0
              ? `${item.prices[0].currency.symbol}${item.prices[0].amount.toFixed(2)}`
              : '$0.00'}
          </p>
        </div>

        {/* Attributes */}
        {item.attributes && item.attributes.map((attribute) => {
          const attributeNameKebabCase = attribute.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={attribute.id} className="flex flex-col gap-2">
              <span className="font-raleway font-normal text-sm leading-[16px] text-[#1D1F22]">
                {attribute.name}:
              </span>
              <div className="flex gap-2 flex-wrap">
                {attribute.items.map((itemValue) => {
                  const isSelected = itemValue.id === (item.selectedAttributes || {})[attribute.id];
                  const itemValueKebabCase = itemValue.value.toLowerCase().replace(/\s+/g, '-');
                  
                  if (attribute.name === 'Color') {
                    return (
                      <div
                        key={itemValue.id}
                        className="relative w-5 h-5" 
                        data-testid={`product-attribute-${attributeNameKebabCase}-${itemValueKebabCase}${
                          isSelected ? '-selected' : ''
                        }`}
                      >
                        {/* Outer green border (shown when selected) */}
                        <div className={`absolute inset-0 box-border ${
                          isSelected ? 'border border-[#5ECE7B]' : 'border-transparent'
                        }`} />

                        <div 
                          className="absolute w-4 h-4 top-0.5 left-0.5" 
                          style={{ backgroundColor: itemValue.value }}
                        />
                      </div>
                    );
                  } else {
                    const isCapacity = attribute.name === 'Capacity';
                    return (
                      <div
                        key={itemValue.id}
                        className={`font-normal flex border-solid border-black items-center justify-center font-source-sans-pro text-sm leading-[160%] border ${
                          isSelected ? 'bg-[#1D1F22] text-white' : 'bg-white text-[#1D1F22]'
                        } ${isCapacity ? 'px-2 py-1' : 'w-6 h-6'}`}
                        data-testid={`product-attribute-${attributeNameKebabCase}-${itemValueKebabCase}${
                          isSelected ? '-selected' : ''
                        }`}
                      >
                        {itemValue.value}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quantity controls - Updated to 24x24px boxes */}
      <div className="flex flex-col items-center justify-between ">
        <button
          onClick={() => onIncrease(item.uniqueId)}
          className="w-6 h-6 flex items-center justify-center border border-[#1D1F22] hover:bg-gray-100"
          data-testid="cart-item-amount-increase"
        >
          <div className="relative w-2 h-2">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1D1F22] transform -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#1D1F22] transform -translate-x-1/2" />
          </div>
        </button> 
        
        <span 
          className="font-raleway font-medium text-base leading-[160%] text-[#1D1F22]"
          data-testid="cart-item-amount"
        >
          {item.quantity || 0}
        </span>
        
        <button
          onClick={() => onDecrease(item.uniqueId)}
          className="w-6 h-6 flex items-center justify-center border border-[#1D1F22] hover:bg-gray-100"
          data-testid="cart-item-amount-decrease"
        >
          <div className="relative w-2 h-px bg-[#1D1F22]" />
        </button>
      </div>

      {/* Product image */}
      <div className="w-[121px] h-[167px] flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.target.src = 'path/to/fallback/image.png';
          }}
        />
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default CartItem;