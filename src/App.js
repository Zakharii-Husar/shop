import "./style/App.scss";
import Fetch from "./components/Fetch";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillShopping, AiOutlineMenu } from "react-icons/ai";
import { search } from "./components/stateSlice";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const LOCATION = useLocation();
  const CART_STATE = useSelector((state) => state.section.cart);
  const INPUT_STATE = useSelector((state) => state.section.input);
  const userIsSearching =
    INPUT_STATE.length > 0 && LOCATION.pathname !== "/" ? (
      <Navigate to="/" />
    ) : null;
  const clearSearchInput = () => dispatch(search(""));
  window.onpopstate = () => clearSearchInput();
  const switchList = () => {
    clearSearchInput();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <div className="header">
        <Link to="/" onClick={switchList}>
          Home
        </Link>

        <div className="navigation">
          {userIsSearching}

          <Link to="/menu" onClick={switchList}>
            <AiOutlineMenu className="menuIcon" />
          </Link>

          <input
            value={INPUT_STATE}
            onChange={(e) => dispatch(search(e.target.value))}
            className="searchBar"
            type="text"
          ></input>

          <Link to="/cart" onClick={switchList}>
            <AiFillShopping className="cartIcon" />
          </Link>
          <span className="cartCount">{CART_STATE.length}</span>
        </div>
      </div>
      <Outlet />
      <Fetch />
    </div>
  );
}

export default App;
