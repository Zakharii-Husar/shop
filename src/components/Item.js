import {useLocation} from "react-router-dom";

function Item() {
    const location = useLocation();
    const itemProps = location.state

    return (
        <div className="Item">
           <div>{itemProps.brand}</div>
           
        </div>
    );
}

export default Item;