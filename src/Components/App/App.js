import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Navigation from "../Navigation/Navigation";

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
  clearMoviesList = () => {
    this.setState(() => {
      return {
        movies: [],
				isError: true
      }
    })
  };
  getMovieById = movie => {
    const movieId = this.findMovieId("movies", movie);
    this.setState({
      movie: this.state.movies[movieId]
    });
  };
  searchMoviesInAPi = movie => {
    this.movieApi.getMovieList(movie).then(item => {
      item ? this.updateMoviesList(item) : this.clearMoviesList()
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
    return (
      <Router>
        <Fragment>
          <Navigation />
          <Route
            path="/"
            exact
            render={() => (
              <MovieSearch searchMoviesInAPi={this.searchMoviesInAPi} />
            )}
          />
          <Route path="/error" />
          <Route
            path="/movies"
            exact
            render={() => (
              <MoviesList
                error={this.state.isError}
                list={"movies"}
                getMovieById={this.getMovieById}
                moviesList={this.state.movies}
              />
            )}
          />
          <Route
            path="/favorites"
            exact
            render={() => (
              <MoviesList
                error={false}
                list={"favorites"}
                getMovieById={this.getMovieById}
                moviesList={this.state.favorites}
              />
            )}
          />
          <Route
            path="/:list/:id"
            exact
            render={props => (
              <MovieItem
                {...props}
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
