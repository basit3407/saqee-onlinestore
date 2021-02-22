import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cart";

const initialState = {
  cartItems: [],
  totalQty: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      //   check if products with this title are already present in cart
      const productExists = state.cartItems.filter(
        (product) => product.title === action.payload.title
      );

      if (productExists.length) {
        // check if variation is matching with any of previous products with same title
        const variationExists = productExists.find(
          (product) => product.variation === action.payload.variation
        );

        if (variationExists) {
          return {
            //increase the total quantity of items
            totalQty: state.totalQty + action.payload.qty,
            //cartItems will be updated.each item will be checked for the variation
            cartItems: state.cartItems.map((cartItem) => {
              // if variation is differnt leave it alone.
              if (cartItem.variation !== action.payload.variation)
                return cartItem;

              //increase the quantity of the item with same variation
              return {
                ...cartItem,
                qty: cartItem.qty + action.payload.qty,
              };
            }),
          };
        }
      }

      // if products with this title are not present, or variation is not present just update the cart and increase total qty
      return {
        totalQty: state.totalQty + action.payload.qty,
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case CART_REMOVE_ITEM: {
      // decrease the qty of the item which user has decided to remove from cart
      const updatedCartItems = state.cartItems.map((item) => {
        if (
          item.variation === action.payload.variation &&
          item.title === action.payload.title
        )
          return {
            ...item,
            qty: item.qty - action.payload.qty,
          };

        return item;
      });
      return {
        //decrease the total quantity of cart items
        totalQty: state.totalQty - action.payload.qty,

        //return updated cartItems.but if qty of item is 0,remove that item.
        cartItems: updatedCartItems.filter((item) => item.qty > 0),
      };
    }

    default:
      return state;
  }
}
