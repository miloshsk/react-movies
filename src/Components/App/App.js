import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Error from "../Error/Error";

import Api from "../../api/api";

import "normalize.css";
import "./app.sass";

export default class App extends Component {
  movieApi = new Api();

  state = {
    movies: [],
    favorites: [],
    movie: null,
    isError: false
  };
  updateMoviesList = movies => {
    this.setState({
      movies,
      isError: false
    });
  };
  getMovieById = movie => {
    const movieId = this.findMovieId("movies", movie);
    this.setState({
      movie: this.state.movies[movieId]
    });
  };
  showError = () => {
    this.setState({
      isError: true
    });
  };
  searchMoviesInAPi = movie => {
    this.movieApi.getMovieList(movie).then(item => {
      item ? this.updateMoviesList(item) : this.showError();
    });
  };
  addMovieToFavorites = movie => {
    this.setState(({ favorites }) => {
      return {
        favorites: [...favorites, movie]
      };
    });
  };
  findMovieId = (list, movie) => {
    return this.state[list].findIndex(item => {
      return item.imdbID === movie.imdbID;
    });
  };
  removeMovieFromFavorites = movie => {
    this.setState(({ favorites }) => {
      return {
        favorites: favorites.filter(mov => mov !== movie)
      };
    });
  };
  addReview = (review, movie) => {
    movie.review = review;
    this.removeMovieFromFavorites(movie);
    this.addMovieToFavorites(movie);
  };
  render() {
    const error = this.state.isError ? <Error /> : null;
    return (
      <Router>
        <Fragment>
          <MovieSearch searchMoviesInAPi={this.searchMoviesInAPi} />
          <Link to="/favorites">Favorites</Link>
          <Link to="/">Home</Link>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <MoviesList
                  getMovieById={this.getMovieById}
                  moviesList={this.state.movies}
                />
              );
            }}
          />
          <Route
            path="/favorites"
            render={() => {
              return (
                <MoviesList
                  getMovieById={this.getMovieById}
                  moviesList={this.state.favorites}
                />
              );
            }}
          />
          {error}
          <Route
            path="/movies/:id"
            render={() => (
              <MovieItem
                addReview={this.addReview}
                addMovieToFavorites={this.addMovieToFavorites}
                removeMovieFromFavorites={this.removeMovieFromFavorites}
                findMovieId={this.findMovieId}
                movie={this.state.movie}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}
