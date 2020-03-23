import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import photoReducers from "./photosReducers";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";
import selectPhotoReducer from "./selectPhotoReducer";
import adminLogin from "./adminLoginReducer";

export default combineReducers({
  photos: photoReducers,
  cart: cartReducer,
  form: formReducer,
  orders: ordersReducer,
  selectPhoto: selectPhotoReducer,
  adminLogin: adminLogin
});
