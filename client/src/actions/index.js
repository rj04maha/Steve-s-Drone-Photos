import upsplash from "../api/upsplash";
import axios from "axios";
import history from "../history";

import {
  SUBMIT_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from "./types";

export const fetchPhotos = () => async dispatch => {
  const response = await upsplash.get("/search/photos", {
    params: { query: "drone", per_page: "30" }
  });

  dispatch({ type: "FETCH_PHOTOS", payload: response.data.results });
};

export const addToCart = photo => {
  return {
    type: "ADD_TO_CART",
    payload: {
      photo
    }
  };
};

export const removeFromCart = photoId => {
  return {
    type: "REMOVE_FROM_CART",
    payload: {
      photoId: photoId
    }
  };
};

export const selectPhoto = photo => {
  return {
    type: "SELECT_PHOTO",
    payload: {
      photo
    }
  };
};

export const unselectPhoto = () => {
  return {
    type: "UNSELECT_PHOTO"
  };
};

/* export const updateCartQuantity = (photoId, quantity) => {
  return {
    type: "UPDATE_CART_QUANTITY",
    payload: {
      photoId,
      quantity: quantity
    }
  };
}; */
// Create a new order
export const submitOrder = values => async dispatch => {
  const res = await axios.post("/api/orders", values);

  //history.push("/ordercomplete");
  dispatch({ type: SUBMIT_ORDER, payload: res.data });
  history.push("/order_complete");
};

// Fetch all orders
export const fetchOrders = () => async dispatch => {
  const res = await axios.get("/api/orders");
  dispatch({ type: FETCH_ORDERS, payload: res.data });
};

export const fetchOrder = id => async dispatch => {
  const res = await axios.get("/api/order_id", id);
  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const updateOrder = (id, values) => async dispatch => {
  const res = await axios.put(`/api/orders/${id}`, values);
  //history.push("/orders");
  dispatch({ type: UPDATE_ORDER, payload: res.data });
};

export const deleteOrder = id => async dispatch => {
  await axios.delete(`/api/orders/${id}`);
  dispatch({ type: DELETE_ORDER, payload: id });
};
