import isEqual from "lodash.isequal";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cart";

const initialState = {
  cartItems: [],
  totalQty: 0,
  totalPrice: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      //   check if products with this title are already present in cart
      const productExists = state.cartItems.filter(
        (product) => product.title === action.payload.title
      );

      if (productExists.length) {
        //check which of the already present products have exact same variation.
        const variationExists = productExists.find((product) =>
          isEqual(product.variations, action.payload.variations)
        );

        if (variationExists) {
          return {
            //if variationExists increase the total quantity and total price of items
            totalQty: state.totalQty + action.payload.qty,
            totalPrice:
              state.totalPrice + action.payload.qty * action.payload.price,

            //increase the qty of the item which has same variations
            cartItems: state.cartItems.map((cartItem) => {
              if (isEqual(cartItem.variations, action.payload.variations))
                return {
                  ...cartItem,
                  qty: cartItem.qty + action.payload.qty,
                };

              //return the remining cart items as it is.
              return cartItem;
            }),
          };
        }
      }

      // if products with this title are not present, or variations are not exact  update the cart and increase total qty
      return {
        totalQty: state.totalQty + action.payload.qty,
        totalPrice:
          state.totalPrice + action.payload.qty * action.payload.price,
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case CART_REMOVE_ITEM: {
      // decrease the qty of the item which user has decided to remove from cart
      const updatedCartItems = state.cartItems.map((cartItem) => {
        if (
          isEqual(cartItem.variations, action.payload.variations) &&
          cartItem.title === action.payload.title
        )
          return {
            ...cartItem,
            qty: cartItem.qty - action.payload.qty,
          };
        //leave the remaining items as it is.
        return cartItem;
      });
      return {
        //decrease the total quantity and total price of cart items
        totalQty: state.totalQty - action.payload.qty,
        totalPrice:
          state.totalPrice - action.payload.qty * action.payload.price,

        //return updated cartItems.but if qty of item is 0,remove that item.
        cartItems: updatedCartItems.filter((item) => item.qty > 0),
      };
    }

    default:
      return state;
  }
}
