import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PHOTOS":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    //case "ADD_PHOTO":
    //return { ...state, [action.payload._id]: action.payload };
    case "FETCH_PHOTO":
      return { ...state, [action.payload._id]: action.payload };
    case "UPDATE_PHOTO":
      return { ...state, [action.payload._id]: action.payload };
    case "DELETE_PHOTO":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
