import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import photoReducers from "./photosReducers";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";
import adminLogin from "./adminLoginReducer";
import search from "./searchReducer";
import searchByDate from "./searchByDateReducer";

export default combineReducers({
  photos: photoReducers,
  cart: cartReducer,
  form: formReducer,
  orders: ordersReducer,
  adminLogin: adminLogin,
  search: search,
  searchByDate: searchByDate,
});
