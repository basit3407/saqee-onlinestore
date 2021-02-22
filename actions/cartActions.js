import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cart";

export const addToCart = (title, qty, variation) => (dispatch, getstate) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: title,
      variation,
      qty: qty,
    },
  });

  // get the current state of cart items from store
  const {
    cart: { cartItems, totalQty },
  } = getstate();
  //save to cookie so that cookie always has updated state
  Cookie.set("cartItems", { items: cartItems, qty: totalQty });
};

export const removeFromCart = (title, qty, variation) => (
  dispatch,
  getstate
) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: title,
      variation,
      qty: qty,
    },
  });

  // get the current state of cart items from store
  const {
    cart: { cartItems, totalQty },
  } = getstate();
  //save to cookie so that cookie always has updated state
  Cookie.set("cartItems", { items: cartItems, qty: totalQty });
};
