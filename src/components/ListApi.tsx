import useAxios, { AxiosData } from '../hooks/useAxios';
import ApiCard from './ApiCard';

interface ListApiProps {
  response: AxiosData;
  loading: boolean;
}

const ListApi: React.FC<ListApiProps> = ({ response, loading }) => {
  console.log(response);
  return (
    <div className='mx-2 mb-10'>
      <h3 className='font-semibold text-xl text-gray-700'>List API</h3>
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
