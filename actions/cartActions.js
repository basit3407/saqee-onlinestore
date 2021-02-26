import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_DETAILS,
} from "../actionTypes/cart";

export const addToCart = (title, qty, variations, price) => (
  dispatch,
  getstate
) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: title,
      variations: variations,
      qty: qty,
      price: price,
    },
  });

  // get the current state of cart items from store
  const {
    cart: { cartItems, totalQty },
  } = getstate();
  //save to cookie so that cookie always has updated state
  Cookie.set("cartItems", { items: cartItems, qty: totalQty });
};

export const removeFromCart = (title, qty, variations, price) => (
  dispatch,
  getstate
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      title: title,
      variations: variations,
      qty: qty,
      price: price,
    },
  });

  // get the current state of cart items from store
  const {
    cart: { cartItems, totalQty },
  } = getstate();
  //save to cookie so that cookie always has updated state
  Cookie.set("cartItems", { items: cartItems, qty: totalQty });
};

export const saveShippingDetails = (details) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_DETAILS, payload: details });
};
