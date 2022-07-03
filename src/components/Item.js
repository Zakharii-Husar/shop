import {useLocation} from "react-router-dom";

function Item() {
    const location = useLocation();
    const itemProps = location.state

    return (
        <div className="Item">
            {itemProps.brand}
        </div>
    );
}

export default Item;