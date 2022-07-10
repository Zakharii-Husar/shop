import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { like, unlike, add, increaseQuantity, remove, decreaseQuantity } from './sectionSlice';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

function Section() {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.data);
  const CART = useSelector(state => state.section.cart);
  const LIKED = useSelector(state => state.section.favourite);
  const LOCATION = useLocation();
  const MENU_PROPS = LOCATION.state;
  return (
    <div className="Section">
      {DATA[MENU_PROPS]?.map(item => {

        const name = `${item.brand.charAt(0).toUpperCase()}${item.brand.slice(1)}
        ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`;

        const isItemLiked = LIKED.includes(item) ? true : false;

        const addedItemIndex = CART
          .indexOf(CART
            .filter(i => i.id === item.id)[0]);

        const quantity = CART[addedItemIndex]?.quantity || 0;

        return (
          <div className="sectionContainer" key={item.brand + item.model}>

            <div className="favBtn" onClick={() => isItemLiked ? dispatch(unlike(item)) : dispatch(like(item))} >
              {isItemLiked ? <MdFavorite size={40} /> : <MdFavoriteBorder size={40} />}
            </div>


            <Link state={item} to={`/${MENU_PROPS}/${item.brand}${item.model}`}>
              <div className="sectionHeader">
                <h2>{`${name} ${item.color} ${item.ram}/${item.memory}GB`}</h2>
                <div>{`Price: ${item.price}$`}</div>
              </div>
              <img src={require(`../../img/${item.brand}&${item.model}.jpg`)} /></Link>


            <div className="sectionControl">
              <AiOutlineMinusSquare onClick={()=> quantity > 0 ? dispatch(decreaseQuantity(addedItemIndex)) : dispatch(remove(addedItemIndex))} size={40} />

              <div className="quantityCount">{quantity}</div>

              <AiOutlinePlusSquare onClick={() => CART[addedItemIndex] ? dispatch(increaseQuantity(addedItemIndex)) : dispatch(add(item))} size={40} />
            </div>

          </div>
        )
      })}
      <Outlet />
    </div>
  );
}

export default Section;