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
  getMovie = id => {
    const movieId = this.state.movies.findIndex(movie => {
      return movie.imdbID === id;
    });
    this.setState({
      movie: this.state.movies[movieId]
    });
  };
  showError = () => {
    this.setState({
      isError: true
    });
  };
  movieSearch = movie => {
    this.movieApi.getMovieList(movie).then(item => {
      if (item) {
        this.updateMoviesList(item);
      } else {
        this.showError();
      }
    });
  };
  addToFavorites = movie => {
    this.setState(({ favorites }) => {
      const newList = [...favorites, movie];
      return {
        favorites: newList
      };
    });
  };
  findMovieInFavorites = movie => {
    return this.state.favorites.findIndex(item => {
      return item.imdbID === movie.imdbID;
    });
  };
  removeMovieFromFavorites = id => {
    this.setState(({ favorites }) => {
      const index = this.findMovieInFavorites(id);
      let newFavoriteList = favorites.slice();
      newFavoriteList.splice(index, 1);
      return {
        favorites: newFavoriteList
      };
    });
  };
  addReview = (review, movie) => {
    const id = this.findMovieInFavorites(movie);
    movie.review = review;
    this.removeMovieFromFavorites(id);
    this.addToFavorites(movie);
  };
  render() {
    const error = this.state.isError ? <Error /> : null;
    return (
      <Router>
        <Fragment>
          <MovieSearch movieSearch={this.movieSearch} />
          <Link to="/favorites">Favorites</Link>
          <Link to="/">Home</Link>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <MoviesList
                  getId={this.getMovie}
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
                  getId={this.getMovie}
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
                addToFavorites={this.addToFavorites}
                removeMovieFromFavorites={this.removeMovieFromFavorites}
                findMovieInFavorites={this.findMovieInFavorites}
                movie={this.state.movie}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}
