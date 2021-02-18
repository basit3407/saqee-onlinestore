import { combineReducers } from "redux";
import { productListReducer } from "./productReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  products: productListReducer,
  errors: errorReducer,
});
