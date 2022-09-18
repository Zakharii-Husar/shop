import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';

function Item() {
    const [iconNumber, setIconNumber] = useState(1);
    const location = useLocation();
    const itemProps = location.state;

    const firstLetterToUpperCase = (word) => {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    };

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

    const showConditionally = condition => {
        return {display: condition ? "flex" : "none"}
    };


    return (
        <div className="Item">
            <h2 className="itemHeader">{itemProps.brand} {itemProps.model}</h2>

            <div className="itemPicture">
                <MdOutlineArrowLeft size={40} className="swipeLeft" onClick={() => setIconNumber(iconNumber - 1)}/>
                <img src={itemPicture} alt="img"/>
                <MdOutlineArrowRight size={40} className="swipeRight" onClick={() => setIconNumber(iconNumber + 1)}/>
            </div>

            
            <ul className="itemDescription">
                <li style={showConditionally(itemProps.battery)}>Battery: {itemProps.battery}</li>
                <li style={showConditionally(itemProps.memory)}>Harddrive: {itemProps.memory}</li>
                <li style={showConditionally(itemProps.ram)}>RAM: {itemProps.ram}</li>
                <li style={showConditionally(itemProps.camera)}>Camera: {itemProps.camera}</li>
                <li style={showConditionally(itemProps.display)}>Display: {itemProps.display}</li>
                <li style={showConditionally(itemProps.os)}>OS: {itemProps.os}</li>
                <li style={showConditionally(itemProps.connectivity)}>Connectivity: {itemProps.connectivity}</li>
                <li className="itemColor">
                    <span>Color: {firstLetterToUpperCase(itemProps.color)} </span>
                    <span className="colorSample"
                    style={{backgroundColor: itemProps.color}}></span>
                </li>
            </ul>
        </div>
    );
}

export default Item;