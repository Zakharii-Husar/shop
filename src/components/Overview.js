import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  like,
  unlike,
  add,
  increaseQuantity,
  remove,
  decreaseQuantity,
  search,
} from "./stateSlice";

import searchF from "../functions/searchF";
import calculateTotalPriceF from "../functions/calculateTotalPriceF";

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiFillDelete,
} from "react-icons/ai";

function Overview({ type }) {
  const dispatch = useDispatch();
  const DATA = useSelector((state) => state.data);
  const CART = useSelector((state) => state.section.cart);
  const LIKED = useSelector((state) => state.section.favourite);
  const SEARCHED = useSelector((state) => state.section.input);
  const LOCATION = useLocation();
  const SECTION_LINK = LOCATION.state || type;
  let ARR = DATA[LOCATION.state];
  let EMPTY_LIST_MESSAGE =
    SEARCHED.length === 1 ? "Keep typing..." : "Nothing has been found";

  const setCurrentListOfProducts = () => {
    const allItems = () => {
      const all = [];
      Object.keys(DATA).forEach((key) => {
        DATA[key].forEach((obj) => {
          all.push(obj);
        });
      });
      return all;
    };

    if (type === "cart") {
      ARR = CART;
      EMPTY_LIST_MESSAGE =
        SEARCHED.length === 0
          ? "Your cart is empty."
          : "Nothing has been found in the cart.";
    }
    if (type === "favourite") {
      ARR = LIKED;
      EMPTY_LIST_MESSAGE =
        SEARCHED.length === 0
          ? "You don't have favourite items yet"
          : "Nothing has been found in your favourite items.";
    }
    if (type === "home") ARR = allItems();
    if (SEARCHED.length > 0) ARR = searchF(SEARCHED, ARR);
  };

  setCurrentListOfProducts();

  return (
    <div className="Overview">
      <div
        className="cartSummary"
        style={{
          display: type === "cart" && ARR?.length > 0 ? "flex" : "none",
        }}
      >
        {calculateTotalPriceF(CART)}
      </div>

      <div style={{ display: ARR?.length > 0 ? "none" : "flex" }}>
        {EMPTY_LIST_MESSAGE}
      </div>

      {ARR?.map((item) => {
        const name = `${item.brand.charAt(0).toUpperCase()}${item.brand.slice(
          1
        )}
        ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`;

        const isItemLiked = LIKED.filter((i) => i.id === item.id).length
          ? true
          : false;

        const addedItemIndex = CART.indexOf(
          CART.filter((i) => i.id === item.id)[0]
        );

        const quantityInCart = CART[addedItemIndex]?.quantity || 0;

        const minusBtn = () => {
          if (quantityInCart === 0) return;
          quantityInCart === 1
            ? dispatch(remove(addedItemIndex))
            : dispatch(decreaseQuantity(addedItemIndex));
        };

        const plusBtn = () => {
          CART[addedItemIndex]
            ? dispatch(increaseQuantity(addedItemIndex))
            : dispatch(add(item));
        };

        const likeBtn = () => {
          isItemLiked ? dispatch(unlike(item)) : dispatch(like(item));
        };

        return (
          <div className="overviewContainer" key={item.id}>
            <div className="favBtn" onClick={likeBtn}>
              {isItemLiked ? (
                <MdFavorite size={40} />
              ) : (
                <MdFavoriteBorder size={40} />
              )}
            </div>

            <Link
              onClick={() => dispatch(search(""))}
              state={item}
              to={`/${SECTION_LINK}/${item.brand}${item.model}`}
            >
              <div className="overviewHeader">
                <h2>{`${name} ${item.color} ${item.ram || ""} ${
                  item.memory || ""
                }`}</h2>
                <div>{`Price: ${item.price}$`}</div>
              </div>

              <img
                src={require(`../img/${item.brand}/${item.model}/1.jpg`)}
                alt="img"
              />
            </Link>

            <div className="overviewControl">
              {quantityInCart === 1 ? (
                <AiFillDelete onClick={minusBtn} size={40} />
              ) : (
                <AiOutlineMinusSquare onClick={minusBtn} size={40} style={quantityInCart === 0 ? {color: "grey"} : {}}/>
              )}

              <div className="quantityCount">{quantityInCart}</div>

              <AiOutlinePlusSquare onClick={plusBtn} size={40} />
            </div>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}

export default Overview;
