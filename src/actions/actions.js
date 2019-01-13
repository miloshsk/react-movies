import {
  ADD_REVIEW,
  REMOVE_FAVORITES,
  ADD_FAVORITES,
  GET_MOVIE,
  FETCH_MOVIES
} from "./types";
export const fetchMovies = movie => dispatch => {
  fetch(`https://www.omdbapi.com/?apikey=e99e23f5&s=${movie}`)
    .then(res => res.json())
    .then(movs => movs.Search)
    .then(movies =>
      dispatch({
        type: FETCH_MOVIES,
        payload: movies ? movies : []
      })
    );
};
export const getMovie = movie => dispatch => {
  dispatch({
    type: GET_MOVIE,
    payload: movie
  });
};
export const addFavorites = movie => dispatch => {
  dispatch({
    type: ADD_FAVORITES,
    payload: movie
  });
};
export const removeFavorites = movie => dispatch => {
  dispatch({
    type: REMOVE_FAVORITES,
    payload: movie
  });
};
export const addReview = (review, movie) => dispatch => {
  dispatch({
    type: ADD_REVIEW,
    payload: review,
    movie
  });
};
