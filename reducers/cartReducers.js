import isEqual from "lodash.isequal";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cart";

const initialState = {
  cartItems: [],
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
        //return updated cartItems.but if qty of item is 0,remove that item.
        cartItems: updatedCartItems.filter((item) => item.qty > 0),
      };
    }

    default:
      return state;
  }
}
