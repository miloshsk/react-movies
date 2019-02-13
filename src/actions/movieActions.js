import {
  SET_REVIEW,
  GET_MOVIE,
  FETCH_MOVIES,
  SET_SEARCHING_MOVIE,
  FETCH_FAVORITES
} from "./types";
import { database } from "../firebase/firebase";

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
export const fetchFavorites = user => dispatch => {
  database
    .ref(`favorites/${user}`)
    .once("value")
    .then(s => {
      return s.val() || {};
    })
    .then(x => {
      return Object.values(x);
    })
    .then(res => {
      dispatch({
        type: FETCH_FAVORITES,
        payload: res
      });
    });
};
export const setSearchingResult = movie => dispatch => {
  dispatch({
    type: SET_SEARCHING_MOVIE,
    payload: movie
  });
};
export const getMovie = movie => dispatch => {
  dispatch({
    type: GET_MOVIE,
    payload: movie
  });
};
export const setReview = (review, movie, user) => dispatch => {
  database.ref(`favorites/${user}/${movie.Title}`).update({ review });
  dispatch({
    type: SET_REVIEW,
    payload: review,
    movie
  });
};
