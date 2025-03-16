import { GET_CATEGORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState} from 'react';

const CategoryList = () => {
  
  
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState(null);

  
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="bg-white p-4">
      <div className="flex justify-center space-x-6 border-b border-gray-300">
        {data.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`text-lg font-semibold pb-2 ${
              activeCategory === category.id
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeCategory ? (
          <p className="text-center text-gray-600">
            Selected Category: {data.categories.find(cat => cat.id === activeCategory)?.name}
          </p>
        ) : (
          <p className="text-center text-gray-500">Select a category to view details.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
