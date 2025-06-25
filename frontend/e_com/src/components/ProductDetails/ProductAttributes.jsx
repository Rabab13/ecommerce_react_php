import PropTypes from 'prop-types';

const ProductAttributes = ({ attributes, selectedAttributes, onSelectAttribute }) => {
  return (
    <div className="space-y-4">
      {attributes.map((attr) => {
        const kebab = attr.name.toLowerCase().replace(/\s+/g, '-');

        return (
          <div key={attr.id} data-testid={`product-attribute-${kebab}`}>
            <h3 className="font-roboto-condensed font-bold uppercase">{attr.name}:</h3>
            <div className="text-lg font-roboto-condensed p-1 flex gap-2 flex-wrap">
              {attr.items.map((item) => {
                const isSelected = selectedAttributes[attr.id] === item.id;

                if (attr.name === 'Color') {
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectAttribute(attr.id, item.id)}
                      className="relative w-9 h-9 cursor-pointer"
                      data-testid={`product-attribute-${kebab}-${item.value}${
                        isSelected ? '-selected' : ''
                      }`}
                    >
                      <div
                        className={`absolute    inset-0 rounded-sm border ${
                          isSelected ? 'border-[#5ECE7B]' : 'border-transparent'
                        }`}
                      />
                      <div
                        className="absolute w-8 h-8 rounded-sm"
                        style={{ 
                          backgroundColor: item.value,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectAttribute(attr.id, item.id)}
                      className={`border w-[63px] h-[45px] ${
                        isSelected ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                      data-testid={`product-attribute-${kebab}-${item.value}`}
                    >
                      {item.value}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProductAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  onSelectAttribute: PropTypes.func.isRequired,
};

export default ProductAttributes;