import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";

import calculateTotalPriceF from "../functions/calculateTotalPriceF";
import { search } from "../state/stateSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const LOCATION = useLocation();
  const CART = useSelector((state) => state.section.cart);
  const INPUT_STATE = useSelector((state) => state.section.input);
  const navigate = useNavigate();

  useEffect(() => {
    if (INPUT_STATE.length && (LOCATION.pathname === "/menu" || LOCATION.state?.id))
      navigate("/", { replace: true });
  }, [
    INPUT_STATE.length,
    LOCATION.pathname,
    navigate,
    LOCATION.state?.id]);

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
      <Link className="head" to="/" onClick={switchList}>
        Electronics
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
          <MdAddShoppingCart className="cartIcon" />
          <span
            className="cartCount"
            style={{ display: CART.length ? "inline-block" : "none" }}
          >
            {CART.length}
          </span>

        </Link>
      </div>
      <Outlet />
                <div
            style={{ display: CART.length && LOCATION.pathname === "/cart" ? "flex" : "none" }}
            className="cartSummary"
          >
            {calculateTotalPriceF(CART)}
          </div>
    </div>
  );
}

export default Navbar;
