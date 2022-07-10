import { Outlet, Link } from "react-router-dom";
import { AiFillShopping, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <div className="navigation">
                <Link to="/menu"><AiOutlineMenu className="menuIcon" /></Link>
                <input className="searchBar" type='text'></input>
                <Link to="/cart"><AiFillShopping className="cartIcon" /></Link>
                <span className="cartCount">1</span>
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;