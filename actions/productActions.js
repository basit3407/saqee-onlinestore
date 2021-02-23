import axios from "axios";
import {
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_SUCCESS,
} from "../actionTypes/product";

export const getProduct = (productTitle, category) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${category}/${productTitle}`
    );

    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data.product });
    localStorage.setItem("title", data.product.title);
    localStorage.setItem("image", data.product.image);
  } catch (e) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: e.response.data.error });
  }
};
