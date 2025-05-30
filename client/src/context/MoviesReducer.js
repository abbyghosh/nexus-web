const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: "Something went wrong!!",
        data: [],
      };
    default:
      return state;
  }
};

export default MoviesReducer;
