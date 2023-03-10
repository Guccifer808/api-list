import { AxiosData } from '../hooks/useAxios';
import ApiCard from './ApiCard';

interface ListApiProps {
  response: AxiosData;
  loading: boolean;
}

const ListApi: React.FC<ListApiProps> = ({ response, loading }) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className='mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse'>
        {[...Array(3).keys()].map((number) => (
          <div
            className='h-32 w-full bg-gray-300 m-1 rounded-xl'
            key={number}
          ></div>
        ))}
      </div>
    );
  }
  if (!response.entries) {
    return (
      <p className='text-center text-gray-500 text-2xl m-20'>
        Oops! Somethings went wrong...
      </p>
    );
  }
  return (
    <div className='mx-2 mb-10'>
      <h3 className='font-semibold text-xl text-gray-700 text-center m-4'>
        List of available APIs
      </h3>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {response.entries?.map((api, index) => (
          <ApiCard key={index} api={api} />
        ))}
      </div>
    </div>
  );
};

export default ListApi;
