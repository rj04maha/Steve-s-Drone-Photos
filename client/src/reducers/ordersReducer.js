import _ from "lodash";
import {
  SUBMIT_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SUBMIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    //return action.payload;
    case FETCH_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ORDER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
