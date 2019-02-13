import {
  FETCH_MOVIES,
  GET_MOVIE,
  SET_REVIEW,
  SET_SEARCHING_MOVIE,
  FETCH_FAVORITES
} from "../actions/types";

const initialState = {
  movies: [],
  favorites: [],
  movie: null,
  review: "",
  searchingMovie: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case SET_SEARCHING_MOVIE:
      return {
        ...state,
        searchingMovie: action.payload
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case FETCH_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    case SET_REVIEW:
      return {
        ...state,
        favorites: state.favorites.map(movie =>
          movie.imdbID === action.movie.imdbID
            ? { ...movie, review: action.payload }
            : movie
        ),
        movie: { ...state.movie, review: action.payload }
      };
    default:
      return state;
  }
}
