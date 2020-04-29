import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, [action.payload.photo._id]: action.payload.photo };
    case "REMOVE_FROM_CART":
      return _.omit(state, action.payload);
    case "CLEAR_CART":
      for (var item in state) delete state[item];
      return { ...state };
    default:
      return state;
  }
};
