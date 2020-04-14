export default (state = null, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_BY_DATE":
      state = action.payload;
      return state;
    case "CLEAR_SEARCH_BY_DATE":
      state = null;
      return state;
    default:
      return state;
  }
};
