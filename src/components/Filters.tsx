import { useEffect, useState } from 'react';
import useAxios, { AxiosData } from '../hooks/useAxios';
import { AxiosError, AxiosResponse } from 'axios';

export interface FilterProps {
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

  const [displayCount, setDisplayCount] = useState<number>(3); // Number of buttons to display initially
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className='my-5 animate-pulse inline-block text-center'>
        {[...Array(10).keys()].map((number) => (
          <div
            key={`loading-${number.toString()}`}
            className='h-7 w-20 bg-gray-300 m-1 rounded-md inline-block'
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
    setIsExpanded(false);
    setDisplayCount(3); // Reset the number of buttons to display to initial state
  };
  //load more button
  const handleLoadMore = () => {
    setDisplayCount(displayCount + (fetchedCategories?.length ?? 0)); // Increment the number of buttons to display
    //set the default value of fetchedCategories to an empty array ([]) if it is undefined, so that you can safely access its length property without causing an error
    setIsExpanded(true);
  };
  //hide button
  const handleHide = () => {
    setIsExpanded(false);
    setDisplayCount(3); // Reset the number of buttons to display to initial state
  };
  return (
    <div className='text-center my-4'>
      <h3 className='font-semibold text-xl text-gray-700 text-center m-4'>
        Filter Categories
      </h3>
      <div className='grid grid-cols-3 gap-2 px-2'>
        {fetchedCategories &&
          fetchedCategories
            .slice(0, isExpanded ? fetchedCategories.length : displayCount)
            .map((category: string) => (
              <button
                className='bg-blue-500 text-stone-50 md:m-2 m-0.5 p-2 text-sm font-semibold hover:bg-blue-600 min-w-[115px] rounded-md hover:scale-105 transform transition duration-150 ease-in-out'
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
              className='bg-purple-800 font-semibold text-stone-50 py-2 m-1 mt-4 px-2 hover:bg-blue-600 min-w-[115px] rounded-md hover:scale-105 transform transition duration-150 ease-in-out'
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
          {isExpanded && (
            <button
              className='bg-purple-800 text-stone-50 py-2 m-1 mt-4 px-2 hover:bg-blue-600 min-w-[115px] rounded-md hover:scale-105 transform transition duration-150 ease-in-out'
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
