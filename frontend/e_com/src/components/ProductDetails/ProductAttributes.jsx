import PropTypes from 'prop-types';

const ProductAttributes = ({ attributes, selectedAttributes, onSelectAttribute }) => {

  const createTestId = (base, value = '', isSelected = false) => {
    const cleanBase = base.toLowerCase().replace(/\s+/g, '-');
    const cleanValue = value.toLowerCase().replace(/\s+/g, '-');
    return `product-attribute-${cleanBase}${value ? `-${cleanValue}` : ''}${isSelected ? '-selected' : ''}`;
  };

  return (
    <div className="space-y-4">
      {attributes.map((attr) => {
        const attributeTestId = createTestId(attr.name);

        return (
          <div key={attr.id} data-testid={attributeTestId}>
            <h3 className="font-roboto-condensed font-bold uppercase">{attr.name}:</h3>
            <div className="text-lg font-roboto-condensed p-1 flex gap-2 flex-wrap">
              {attr.items.map((item) => {
                const isSelected = selectedAttributes[attr.id] === item.id;
                const itemTestId = createTestId(attr.name, item.value, isSelected);

                if (attr.name.toLowerCase() === 'color') {
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectAttribute(attr.id, item.id)}
                      className="relative w-9 h-9 cursor-pointer"
                      data-testid={itemTestId}
                    >
                      <div
                        className={`absolute inset-0 rounded-sm border ${
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
                      data-testid={itemTestId}
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