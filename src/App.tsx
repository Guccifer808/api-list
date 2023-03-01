import Filters from './components/Filters';
import Header from './components/Header';
import useAxios from './hooks/useAxios';

function App() {
  const { fetchData, response, loading, error } = useAxios('entries');
  return (
    <div className='App'>
      <Header />
      <div className='mx-auto container max-w-4xl'>
        <Filters categories={response.categories} />
      </div>
    </div>
  );
}

export default App;
