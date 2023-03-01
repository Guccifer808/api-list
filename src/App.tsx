import Filters from './components/Filters';
import Header from './components/Header';

function App() {

  return (
    <div className='App'>
      <Header />
      <div className='mx-auto container max-w-4xl'><Filters/></div>
    </div>
  );
}

export default App;
