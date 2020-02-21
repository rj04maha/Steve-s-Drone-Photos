import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import photoReducers from "./photosReducers";
import cartReducer from "./cartReducer";

export default combineReducers({
  photos: photoReducers,
  cart: cartReducer,
  form: formReducer
});
