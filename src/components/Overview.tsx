import { Outlet, Link, useLocation } from "react-router-dom";
import { useTSDispatch, useTSSelector } from "../state/tsRedux";
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

import { itemTypeInterface } from "../state/tsRedux";

function Overview({ type }:{type:string}) {
  const dispatch = useTSDispatch();
  const DATA = useTSSelector((state) => state.data);
  const CART = useTSSelector((state) => state.section.cart);
  const LIKED = useTSSelector((state) => state.section.favourite);
  const SEARCHED = useTSSelector((state) => state.section.input);
  const LOCATION = useLocation();
  const SECTION_LINK = LOCATION.state || type;
  let ARR: itemTypeInterface[] = DATA[LOCATION.state as keyof {}];
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

      {ARR?.map((item:itemTypeInterface) => {
        const name = `${item.brand.charAt(0).toUpperCase()}${item.brand.slice(
          1
        )}
        ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`;

        const isItemLiked = LIKED.filter((i:itemTypeInterface) => i.id === item.id).length
          ? true
          : false;

        const addedItemIndex = CART.indexOf(
          CART.filter((i:itemTypeInterface) => i.id === item.id)[0]
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
              state={item}
              to={`/${SECTION_LINK}/${item.brand}${item.model}`}
            >
              <div className="overviewHeader">
                <h2 onClick={() => dispatch(search(""))}>{`${name} ${item.color} ${item.ram || ""} ${
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
