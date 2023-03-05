import { useEffect } from 'react';
import Filters, { FilterProps } from './components/Filters';
import Header from './components/Header';
import ListApi from './components/ListApi';
import useAxios from './hooks/useAxios';

const App: React.FC = () => {
  const { fetchData, response, loading, error } = useAxios('entries');

  useEffect(() => {
    fetchData({ params: { category: 'Open Source Projects' } });
  }, []);

  const filterProps: FilterProps = {
    categories: response?.categories ?? [],
    response,
    loading,
    fetchData,
    error,
  };

  return (
    <div className='App'>
      <Header fetchData={fetchData} params={{ title: '' }} title={''} />
      <div className='mx-auto container max-w-4xl'>
        <Filters {...filterProps} />
        <ListApi response={response} loading={loading || !response} />
      </div>
    </div>
  );
};

export default App;
