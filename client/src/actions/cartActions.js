export const addToCart = photo => {
  return {
    type: "ADD_TO_CART",
    payload: {
      photo,
      quantity: 1
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
