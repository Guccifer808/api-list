import { useEffect } from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import ListApi from './components/ListApi';
import useAxios from './hooks/useAxios';

function App() {
  const { fetchData, response, loading, error } = useAxios('entries');

  useEffect(() => {
    fetchData({
      params: {
        category: 'Open Source Projects',
      },
    });
  }, []);
  return (
    <div className='App'>
      <Header
        fetchData={fetchData}
        params={{
          title: '',
        }}
        title={''}
      />
      <div className='mx-auto container max-w-4xl'>
        <Filters
          categories={response.categories}
          response={response}
          loading={loading}
          fetchData={fetchData}
          error={error}
        />
        <ListApi response={response} loading={loading} />
      </div>
    </div>
  );
}

export default App;
