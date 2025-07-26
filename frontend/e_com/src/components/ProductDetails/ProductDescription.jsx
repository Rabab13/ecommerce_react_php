import PropTypes from 'prop-types';
import parse from 'html-react-parser';


const ProductDescription = ({ description }) => {
  //  console.log(description);
  return (
    <div className="w-[300px] h-[200px] pt-3 md:w-72 overflow-y-auto font-roboto font-normal text-[16px] leading-[160%] text-gray-700 prose prose-sm"
      data-testid="product-description"
    >
      {parse(description)}
     
    </div>
  );
};

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ProductDescription;