import PropTypes from 'prop-types';

const ProductPrice = ({ prices }) => {
  return (
    <div>
      <h3 className="font-roboto-condensed pb-3 font-bold uppercase">Price:</h3>
      {prices.map((price) => (
        <p
          key={price.currency.label}
          className="font-raleway pb-3 font-bold text-[24px] leading-[18px] text-lg md:text-xl text-black-600"
        >
          {price.currency.symbol}
          {price.amount.toFixed(2)}
        </p>
      ))}
    </div>
  );
};

ProductPrice.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ProductPrice;