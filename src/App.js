import './style/App.scss'
import Navbar from './components/Navbar';
import Fetch from './features/fetch/Fetch';

//test git 2
function App() {
  return (
    <div className="App">
      <Fetch/>
      <Navbar/>
    </div>
  );
}

export default App;
