import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike, add, increaseQuantity, remove, decreaseQuantity } from './stateSlice';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { useEffect } from "react";

function Overview({ type }) {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.data);
  const CART = useSelector(state => state.section.cart);
  const LIKED = useSelector(state => state.section.favourite);
  const SEARCHED = useSelector(state => state.section.input);
  const LOCATION = useLocation();
  let ARR = DATA[LOCATION.state];
  const SECTION_LINK = LOCATION.state || type;

  const allItems = () => {
    const all = [];
    Object.keys(DATA).map(key => {
      DATA[key].map(obj => {
        all.push(obj);
      });
    });
    return all;
  };

  console.log(SEARCHED.length)

  const searchItem = (searchedWord) => {
    const matches = [];
    allItems().forEach(obj => {
      if (JSON.stringify(obj).includes(searchedWord.toLowerCase())) matches.push(obj);
    })
    return matches
  };



  useEffect(() => {
    console.log(searchItem("samsung"));
  })

  const setCurrentListOfProducts = () => {
    if (type === "home") ARR = allItems();
    if (type === "favourite") ARR = LIKED;
    if (type === "cart") ARR = CART;
    if (SEARCHED.length > 0) ARR = searchItem(SEARCHED);
  }

  setCurrentListOfProducts();


  return (
    <div className="Overview">
      <div style={{ display: ARR?.length > 0 ? "none" : "flex" }}>No items yet</div>
      {ARR?.map(item => {

        const name = `${item.brand.charAt(0).toUpperCase()}${item.brand.slice(1)}
        ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`;

        const isItemLiked = LIKED.filter(i => i.id === item.id).length > 0 ? true : false;

        const addedItemIndex = CART
          .indexOf(CART
            .filter(i => i.id === item.id)[0]);

        const quantityInCart = CART[addedItemIndex]?.quantity || 0;

        const minusBtn = () => {
          if (quantityInCart === 0) return;
          quantityInCart === 1 ? dispatch(remove(addedItemIndex)) :
            dispatch(decreaseQuantity(addedItemIndex))
        };

        const plusBtn = () => {
          CART[addedItemIndex] ? dispatch(increaseQuantity(addedItemIndex)) :
            dispatch(add(item))
        };

        const likeBtn = () => {
          isItemLiked ? dispatch(unlike(item)) : dispatch(like(item))
        };

        return (
          <div className="overviewContainer" key={item.id}>

            <div className="favBtn" onClick={likeBtn} >
              {isItemLiked ? <MdFavorite size={40} /> : <MdFavoriteBorder size={40} />}
            </div>

            <Link state={item} to={`/${SECTION_LINK}/${item.brand}${item.model}`}>
              <div className="overviewHeader">
                <h2>{`${name} ${item.color} ${item.ram}/${item.memory}GB`}</h2>
                <div>{`Price: ${item.price}$`}</div>
              </div>

              <img src={require(`../img/${item.brand}&${item.model}.jpg`)} /></Link>

            <div className="overviewControl">
              <AiOutlineMinusSquare onClick={minusBtn} size={40} />

              <div className="quantityCount">{quantityInCart}</div>

              <AiOutlinePlusSquare onClick={plusBtn} size={40} />
            </div>

          </div>
        )
      })}
      <Outlet />
    </div>
  );
}

export default Overview;