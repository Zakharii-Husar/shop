import './style/App.scss'
import Navbar from './components/Navbar';
import Fetch from './features/fetch/Fetch';


function App() {
  return (
    <div className="App">
      <Fetch/>
      <Navbar/>
    </div>
  );
}

export default App;
