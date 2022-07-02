import menuIcon from "../icons/menu.svg";
import cartIcon from "../icons/cart.svg";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <div className="navigation">
                <Link to="/menu"><img src={menuIcon} alt="menu" /></Link>
                <input type='text'></input>
                <Link to="/cart"><img className="cart" src={cartIcon} alt="cart" /></Link>
                <span className="cartCount">1</span>
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;