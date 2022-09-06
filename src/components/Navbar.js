import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillShopping, AiOutlineMenu } from "react-icons/ai";
import { search } from "../state/stateSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const LOCATION = useLocation();
  const CART_STATE = useSelector((state) => state.section.cart);
  const INPUT_STATE = useSelector((state) => state.section.input);
  const navigate = useNavigate();

  useEffect(() => {
    if (INPUT_STATE.length && LOCATION.pathname === "/menu")
      navigate("/", { replace: true });
  }, [INPUT_STATE.length]);

  const clearSearchInput = () => dispatch(search(""));
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const switchList = () => {
    clearSearchInput();
    scrollToTop();
  };

  window.onpopstate = () => {
    //clears input on back button
    switchList();
  };

  return (
    <div className="Navbar">
      <Link to="/" onClick={switchList}>
        Home
      </Link>

      <div className="navigation">
        <Link to="/menu" onClick={switchList}>
          <AiOutlineMenu className="menuIcon" />
        </Link>

        <input
          className="searchBar"
          value={INPUT_STATE}
          onChange={(e) => dispatch(search(e.target.value))}
          type="text"
        ></input>

        <Link to="/cart" onClick={switchList}>
          <AiFillShopping className="cartIcon" />
        </Link>
        <span className="cartCount">{CART_STATE.length}</span>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
