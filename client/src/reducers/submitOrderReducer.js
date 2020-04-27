export default (state = null, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      return action.payload;
    default:
      return state;
  }
};
