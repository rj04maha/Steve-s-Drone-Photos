import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case "FETCH_ORDER":
      return { ...state, [action.payload._id]: action.payload };
    case "UPDATE_ORDER":
      return { ...state, [action.payload._id]: action.payload };
    case "DELETE_ORDER":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
