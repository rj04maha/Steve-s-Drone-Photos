export default (state = null, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH":
      state = action.payload;
      return state;
    case "CLEAR_SEARCH":
      state = null;
      return state;
    default:
      return state;
  }
};
