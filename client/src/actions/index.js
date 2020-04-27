import axios from "axios";
import history from "../history";

/* Photo actions */

export const addPhoto = (values) => async (dispatch) => {
  let config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await axios.post("/api/photos", values, config);
  dispatch({ type: "ADD_PHOTO", payload: res.data });
  history.push("/manage-photos");
};

export const fetchPhotos = () => async (dispatch) => {
  const res = await axios.get("/api/photos");
  dispatch({ type: "FETCH_PHOTOS", payload: res.data });
};

export const fetchPhoto = (id) => async (dispatch) => {
  const res = await axios.get(`/api/photos/${id}`);
  dispatch({ type: "FETCH_PHOTO", payload: res.data });
};

/* export const updatePhoto = (id, values) => async dispatch => {
  const res = await axios.put(`/api/photos/${id}`, values);
  return res;
  //dispatch({ type: "UPDATE_PHOTO", payload: res.data });
}; */

export const deletePhoto = (id) => async (dispatch) => {
  await axios.delete(`/api/photos/${id}`);
  dispatch({ type: "DELETE_PHOTO", payload: id });
  history.push("/manage-photos");
};

/* Cart actions */

export const addToCart = (photo) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      photo,
    },
  };
};

export const removeFromCart = (photoId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: {
      photoId: photoId,
    },
  };
};

/* Order actions */

// Create a new order
export const submitOrder = (values) => async (dispatch) => {
  const res = await axios.post("/api/orders", values);
  dispatch({ type: "SUBMIT_ORDER", payload: res.data });
  dispatch({ type: "CLEAR_CART" });
  history.push("/order-complete");
};

// Fetch all orders
export const fetchOrders = () => async (dispatch) => {
  const res = await axios.get("/api/orders");
  dispatch({ type: "FETCH_ORDERS", payload: res.data });
};

export const fetchOrder = (id) => async (dispatch) => {
  const res = await axios.get(`/api/orders/${id}`);
  dispatch({ type: "FETCH_ORDER", payload: res.data });
};

export const updateOrder = (id, values) => async (dispatch) => {
  const res = await axios.put(`/api/orders/${id}`, values);
  dispatch({ type: "UPDATE_ORDER", payload: res.data });
};

export const deleteOrder = (id) => async (dispatch) => {
  await axios.delete(`/api/orders/${id}`);
  dispatch({ type: "DELETE_ORDER", payload: id });
};

/* Admin actions */
export const adminLogin = async (password) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post("/api/adminLogin", password, config);
  history.push("/admin");
};

/* Search actions */

export const updateSearch = (query) => {
  return {
    type: "UPDATE_SEARCH",
    payload: {
      query,
    },
  };
};

export const clearSearch = () => {
  return {
    type: "CLEAR_SEARCH",
  };
};

export const updateSearchByDate = (query) => {
  return {
    type: "UPDATE_SEARCH_BY_DATE",
    payload: {
      query,
    },
  };
};

export const clearSearchByDate = () => {
  return {
    type: "CLEAR_SEARCH_BY_DATE",
  };
};
