import upsplash from "../api/upsplash";

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

export const updateCartQuantity = (photoId, quantity) => {
  return {
    type: "UPDATE_CART_QUANTITY",
    payload: {
      photoId,
      quantity: quantity
    }
  };
};
