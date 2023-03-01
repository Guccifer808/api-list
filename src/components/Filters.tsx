import { useEffect } from 'react';
import useAxios, { AxiosData } from '../hooks/useAxios';

import { AxiosError, AxiosResponse } from 'axios';
interface FilterProps {
  fetchData: () => Promise<void>;
  categories: string[];
  loading: boolean;
  error: AxiosError | any;
  response: AxiosResponse<any> | AxiosData;
}

const Filters: React.FC<FilterProps> = ({ fetchData: fetchAPI, response }) => {
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
            key={`loading-${number.toString()}`}
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

  //filtering by button click
  const handleClick = (e) => {
    fetchAPI({ params: { category: e.target.value } });
  };

  return (
    <div className='text-center my-4'>
      {/* {categories &&
        categories.map((category) => (
          <button
            className='bg-blue-500 text-stone-50 rounded-xl py-2 m-1 px-2 hover:bg-blue-600'
            key={category}
          >
            {category}
          </button>
        ))} */}
      <div className='grid grid-cols-4 gap-2'>
        {fetchedCategories &&
          fetchedCategories.map((category: string) => (
            <button
              className='bg-blue-500 text-stone-50 py-2 m-1 px-2 hover:bg-blue-600 min-w-[115px]'
              key={category}
              value={category}
              onClick={handleClick}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Filters;
