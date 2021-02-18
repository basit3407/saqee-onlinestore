import axios from "axios";
// import { GET_ERRORS } from "../actionTypes/errors";
// import {
//   PRODUCT_LIST_REQUEST,
//   PRODUCT_LIST_SUCCESS,
// } from "../actionTypes/product";

const listProducts = async (name) => {
  // dispatch({ type: PRODUCT_LIST_REQUEST });
  const { data } = await axios.get(`api/products/${name}`);
  return data.products;
  // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
};

export { listProducts };
