import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, [action.payload.photo._id]: action.payload.photo };
    case "REMOVE_FROM_CART":
      return _.omit(state, action.payload.photoId);
    default:
      return state;
  }
};
/*
export default cartReducer;

 const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existsInArray = state.some(
        item => item.photo.id === action.payload.photo.id
      );
      if (existsInArray) {
        return state;
      } else {
        return [...state, action.payload];
      }
    case "REMOVE_FROM_CART":
      return state.filter(item => item.photo.id !== action.payload.photoId);

    default:
      return state;
  }
};

export default cartReducer;
 */
