import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { itemTypeInterface } from "../state/tsRedux";

function Item() {
    const [ICON_NUMBER, setIconNumber] = useState(1);
    const ITEM_PROPS: itemTypeInterface  = useLocation().state as itemTypeInterface;

    const firstLetterToUpperCase = (word: string): string => {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    };

    const tryRequire = () => {
        try {
            return require(`../img/${ITEM_PROPS.brand}/${ITEM_PROPS.model}/${ICON_NUMBER.toString()}.jpg`);
        } catch (err) {
            ICON_NUMBER > 0 ? setIconNumber(ICON_NUMBER - 1) :
                setIconNumber(ICON_NUMBER + 1);
            return require(`../img/${ITEM_PROPS.brand}/${ITEM_PROPS.model}/1.jpg`);
        }
    }

    const itemPicture = tryRequire();

    const showConditionally = (property: string | undefined): {} => {
        return {display: property ? "flex" : "none"}
    };


    return (
        <div className="Item">
            <h2 className="itemHeader">{ITEM_PROPS.brand} {ITEM_PROPS.model}</h2>

            <div className="itemPicture">
                <MdOutlineArrowLeft size={40} className="swipeLeft" onClick={() => setIconNumber(ICON_NUMBER - 1)}/>
                <img src={itemPicture} alt="img"/>
                <MdOutlineArrowRight size={40} className="swipeRight" onClick={() => setIconNumber(ICON_NUMBER + 1)}/>
            </div>

            
            <ul className="itemDescription">
                <li style={showConditionally(ITEM_PROPS.battery)}>Battery: {ITEM_PROPS.battery}</li>
                <li style={showConditionally(ITEM_PROPS.memory)}>Harddrive: {ITEM_PROPS.memory}</li>
                <li style={showConditionally(ITEM_PROPS.ram)}>RAM: {ITEM_PROPS.ram}</li>
                <li style={showConditionally(ITEM_PROPS.camera)}>Camera: {ITEM_PROPS.camera}</li>
                <li style={showConditionally(ITEM_PROPS.display)}>Display: {ITEM_PROPS.display}</li>
                <li style={showConditionally(ITEM_PROPS.os)}>OS: {ITEM_PROPS.os}</li>
                <li style={showConditionally(ITEM_PROPS.connectivity)}>Connectivity: {ITEM_PROPS.connectivity}</li>
                <li className="itemColor">
                    <span>Color: {firstLetterToUpperCase(ITEM_PROPS.color!)} </span>
                    <span className="colorSample"
                    style={{backgroundColor: ITEM_PROPS.color}}></span>
                </li>
            </ul>
        </div>
    );
}

export default Item;