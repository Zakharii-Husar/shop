import './style/App.scss'
import Fetch from './components/Fetch';
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillShopping, AiOutlineMenu } from 'react-icons/ai';
import { search } from './components/stateSlice';


function App() {
  const dispatch = useDispatch();

  const CART_STATE = useSelector(state => state.section.cart);
  return (
    <div className="App">
      <div className='header'>
      <Link to="/">Home</Link>

      <div className="navigation">

        <Link to="/menu"><AiOutlineMenu className="menuIcon" /></Link>

        <input onChange={e=>dispatch(search(e.target.value))} className="searchBar" type='text'></input>

        <Link to="/cart"><AiFillShopping className="cartIcon" /></Link>
        <span className="cartCount">{CART_STATE.length}</span>

      </div>
      </div>
      <Outlet />
      <Fetch />
    </div>
  );
}

export default App;
