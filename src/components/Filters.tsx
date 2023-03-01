import { useEffect, useState } from 'react';
import useAxios, { AxiosData } from '../hooks/useAxios';

import { AxiosError, AxiosResponse } from 'axios';
interface FilterProps {
  fetchData: (config?: { params: { category: string } }) => Promise<void>;
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

  const [displayCount, setDisplayCount] = useState<number>(4); // Number of buttons to display initially
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.value;
    fetchAPI({ params: { category } });
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 50); // Increment the number of buttons to display
    setIsExpanded(true);
  };

  const handleHide = () => {
    setIsExpanded(false);
    setDisplayCount(4); // Reset the number of buttons to display to initial state
  };
  return (
    <div className='text-center my-4'>
      <div className='grid grid-cols-4 gap-2'>
        {fetchedCategories &&
          fetchedCategories
            .slice(0, isExpanded ? fetchedCategories.length : displayCount)
            .map((category: string) => (
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
      {fetchedCategories && (
        <>
          {displayCount < fetchedCategories.length && !isExpanded && (
            <button
              className='bg-purple-800 text-stone-50 py-2 m-1 px-2 hover:bg-blue-600 min-w-[115px] rounded-md'
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
          {isExpanded && (
            <button
              className='bg-purple-800 text-stone-50 py-2 m-1 px-2 hover:bg-blue-600 min-w-[115px] rounded-md'
              onClick={handleHide}
            >
              Hide
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Filters;
