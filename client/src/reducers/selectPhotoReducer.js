export default (state = null, action) => {
  switch (action.type) {
    case "SELECT_PHOTO":
      return action.payload;
    case "UNSELECT_PHOTO":
      state = null;
      return state;
    default:
      return state;
  }
};
