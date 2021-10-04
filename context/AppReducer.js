const AppReducer = (state, action) => {

  switch (action.type) {

    // 
    case "EDIT_USER":
      return {
        ...state,
        user: action.payload
      };

    //
    case "EDIT_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload
      }

    default:
      return state;
  }
};
export default AppReducer