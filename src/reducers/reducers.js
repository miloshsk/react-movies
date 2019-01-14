import {
  FETCH_MOVIES,
  GET_MOVIE,
  REMOVE_FAVORITES,
  ADD_FAVORITES,
  ADD_REVIEW
} from "../actions/types";

const initialState = {
  movies: [],
  favorites: [],
  movie: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.imdbID !== action.payload.imdbID
        )
      };
    case ADD_REVIEW:
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
