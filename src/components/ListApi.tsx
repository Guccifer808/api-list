import useAxios, { AxiosData } from '../hooks/useAxios';
import ApiCard from './ApiCard';

interface ListApiProps {
  response: AxiosData;
  loading: boolean;
}

const ListApi: React.FC<ListApiProps> = ({ response, loading }) => {
  return (
    <div className='mx-2 mb-10'>
      <h3 className='font-semibold text-xl text-gray-700 text-center m-4'>
        List of available APIs
      </h3>
      <div className='grid gap-4 md:grid-col-3'>
        {response &&
          response.entries?.map((api, index) => (
            <ApiCard key={index} api={api} />
          ))}
      </div>
    </div>
  );
};

export default ListApi;