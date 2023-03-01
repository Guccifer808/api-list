import { useEffect } from 'react';
import useAxios, { AxiosData } from '../hooks/useAxios';

import { AxiosError } from 'axios';
interface FilterProps {
  // fetchData: () => Promise<void>;
  categories: string[];
  loading: boolean;
  // error: AxiosError | null;
  response: AxiosData | null;
}

const Filters: React.FC<FilterProps> = ({ categories, response }) => {
  const {
    fetchData,
    response: { categories: fetchedCategories },
    loading,
  } = useAxios('categories');

  useEffect(() => {
    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className='my-5 animate-pulse inline-block text-center'>
        {[...Array(50).keys()].map((number) => (
          <div
            key={number}
            className='h-7 w-24 bg-gray-300 m-1 rounded-sm inline-block'
          ></div>
        ))}
      </div>
    );
  }
  // Check for error
  if (response instanceof Error) {
    return (
      <div className='text-center my-4'>
        <p>{response.message}</p>
      </div>
    );
  }
  return (
    <div className='text-center my-4'>
      {categories &&
        categories.map((category) => (
          <button className='bg-blue-500 text-stone-50 py-2 m-1 px-2 hover:bg-blue-600'>
            {category}
          </button>
        ))}
      {fetchedCategories &&
        fetchedCategories.map((category: string) => (
          <button className='bg-blue-500 text-stone-50 py-2 m-1 px-2 hover:bg-blue-600'>
            {category}
          </button>
        ))}
    </div>
  );
};

export default Filters;
