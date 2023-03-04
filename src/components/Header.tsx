import React, { useState } from 'react';

export interface FetchDataOptions {
  params: {
    title: string;
  };
  title: string;
  fetchData: (params: { params: { title: string } }) => Promise<void>;
}

const Header: React.FC<FetchDataOptions> = ({ fetchData }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchData({ params: { title: value } });
      setValue('');
    }
  };

  const handleClick = () => {
    if (value.length) {
      fetchData({ params: { title: value } });
      setValue('');
    }
  };

  return (
    <div className='text-center py-20 px-2 bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900'>
      <h3 className='font-bold text-2xl text-stone-50 relative group'>
        Search for public APIs
      </h3>
      <div className='flex items-center mt-8 max-w-md mx-auto bg-stone-50 rounded-md'>
        <input
          type='search'
          className='w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none'
          placeholder='Find your API'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className='flex items-center text-stone-50 rounded-r-md justify-center w-24 bg-gradient-to-l from-blue-500 to-blue-600 h-12 hover:scale-105 hover:bg-blue-600 transform transition duration-150 ease-in-out'
          onClick={handleClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
