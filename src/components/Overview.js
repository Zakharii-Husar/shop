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
} from "../state/stateSlice";

import searchF from "../functions/searchF";
import combineAllProductsF from "../functions/combineAllProductsF";

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
    if (type === "cart") {
      ARR = CART;
    }
    if (type === "favourite") {
      ARR = LIKED;
    }
    if (type === "home") ARR = combineAllProductsF(DATA);
    if (SEARCHED.length) ARR = searchF(SEARCHED, ARR);
  };

  setCurrentListOfProducts();

  return (
    <div className="Overview">
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
            <Link
              onClick={() => dispatch(search(""))}
              state={item}
              to={`/${SECTION_LINK}/${item.brand}${item.model}`}
            >
              <div className="itemHeader">
                <h2>{`${name} ${item.color} ${item.ram || ""} ${
                  item.memory || ""
                }`}</h2>

                <div className="favBtn" onClick={ e => {e.preventDefault(); likeBtn()}}>
                  {isItemLiked ? (
                    <MdFavorite size={40} />
                  ) : (
                    <MdFavoriteBorder size={40} />
                  )}
                </div>
              </div>
            </Link>

            <div className="itemPrice">{`Price: ${item.price}$`}</div>

            <img
              src={require(`../img/${item.brand}/${item.model}/1.jpg`)}
              alt="img"
            />

            <div className="overviewControl">
              {quantityInCart === 1 ? (
                <AiFillDelete
                  className="remBtn"
                  onClick={minusBtn}
                  size={40}
                />
              ) : (
                <AiOutlineMinusSquare
                  className="minusBtn"
                  onClick={minusBtn}
                  size={40}
                  style={{ color: quantityInCart === 0 ? "grey" : "red" }}
                />
              )}

              <div className="quantityCount">{quantityInCart}</div>

              <AiOutlinePlusSquare
                className="plusBtn"
                onClick={plusBtn}
                size={40}
              />
            </div>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}

export default Overview;
