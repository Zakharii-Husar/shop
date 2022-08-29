import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';

function Item() {
    const [iconNumber, setIconNumber] = useState(1);
    const location = useLocation();
    const itemProps = location.state
    const name = `${itemProps.brand.charAt(0).toUpperCase()}${itemProps.brand.slice(1)}
        ${itemProps.model.charAt(0).toUpperCase()}${itemProps.model.slice(1)}`;

    const tryRequire = () => {
        try {
            return require(`../img/${itemProps.brand}/${itemProps.model}/${iconNumber.toString()}.jpg`);
        } catch (err) {
            iconNumber > 0 ? setIconNumber(iconNumber - 1) :
                setIconNumber(iconNumber + 1);
            return require(`../img/${itemProps.brand}/${itemProps.model}/1.jpg`);
        }
    }

    const itemPicture = tryRequire();


    return (
        <div className="Item">
            <div className="itemPicture">
                <MdOutlineArrowLeft className="swipeLeft" onClick={() => setIconNumber(iconNumber - 1)}/>
                <img src={itemPicture} alt="img"/>
                <MdOutlineArrowRight className="swipeRight" onClick={() => setIconNumber(iconNumber + 1)}/>
            </div>
            <div className="itemDescription">
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default Item;