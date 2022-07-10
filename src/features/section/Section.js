import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { like, unlike, add, increaseQuantity } from './sectionSlice';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

function Section() {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.data);
  const SECTION_STATE = useSelector(state => state.section)
  const LOCATION = useLocation();
  const MENU_PROPS = LOCATION.state;
  return (
    <div className="Section">
      {DATA[MENU_PROPS]?.map(item => {

        const name = `${item.brand.charAt(0).toUpperCase()}${item.brand.slice(1)}
        ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`;

        const isItemLiked = SECTION_STATE.favourite.includes(item) ? true : false;
        const itemInTheCart = SECTION_STATE.cart.filter( i => i.brand + i.model === item.brand + item.model);

        return (
          <div className="sectionContainer" key={item.brand + item.model}>
            <div className="favBtn" onClick={() => isItemLiked ? dispatch(unlike(item)) : dispatch(like(item))} >
              {isItemLiked ? <MdFavorite  size={40} /> : <MdFavoriteBorder size={40} />}
            </div>
            <Link state={item} to={`/${MENU_PROPS}/${item.brand}${item.model}`}>
              <div className="sectionHeader">
                <h2>{`${name} ${item.color} ${item.ram}/${item.memory}GB`}</h2>
                <div>{`Price: ${item.price}$`}</div>
              </div>
              <img src={require(`../../img/${item.brand}&${item.model}.jpg`)} /></Link>
            <div className="sectionControl">
              <AiOutlineMinusSquare size={40} />
              <div className="quantityCount">{itemInTheCart.length > 0 ? itemInTheCart[0].quantity : "0"}</div>
              <AiOutlinePlusSquare onClick={()=> itemInTheCart.length > 0 ? dispatch(increaseQuantity(itemInTheCart[0])) : dispatch(add(item))} size={40} />
            </div>
          </div>
        )
      })}
      <Outlet />
    </div>
  );
}

export default Section;