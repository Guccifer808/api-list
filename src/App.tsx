import { useEffect } from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import ListApi from './components/ListApi';
import useAxios from './hooks/useAxios';

function App() {
  const { fetchData, response, loading } = useAxios('entries');

  useEffect(() => {
    fetchData({
      params: {
        category: 'Vehicle',
      },
    });
  }, []);
  return (
    <div className='App'>
      <Header />
      <div className='mx-auto container max-w-4xl'>
        <Filters
          categories={response.categories}
          response={response}
          loading={loading}
        />
        <ListApi response={response} loading={loading} />
      </div>
    </div>
  );
}

export default App;
