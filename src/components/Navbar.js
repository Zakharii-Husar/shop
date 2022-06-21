import menu from "../icons/menu.svg";
import cart from "../icons/cart.svg";
function Navbar() {
    return (
        <div className="Navbar">
            <img src={menu}/>
            <input type='text'></input>
            <img src={cart}/>
        </div>
    );
}

export default Navbar;