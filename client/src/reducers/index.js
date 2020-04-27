import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import photoReducers from "./photosReducers";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";
import search from "./searchReducer";
import searchByDate from "./searchByDateReducer";
import submitOrderReducer from "./submitOrderReducer";

export default combineReducers({
  photos: photoReducers,
  cart: cartReducer,
  form: formReducer,
  orders: ordersReducer,
  search: search,
  searchByDate: searchByDate,
  submitOrder: submitOrderReducer,
});
