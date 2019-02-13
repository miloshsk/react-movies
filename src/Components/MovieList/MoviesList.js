import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from ".././Spinner/Spinner";
import "./movie-list.sass";
import connect from "react-redux/es/connect/connect";
import {
  getMovie,
  fetchMovies,
  fetchFavorites
} from "../../actions/movieActions";
import { showSpinner } from "../../actions/actions";

class MoviesList extends Component {
  componentDidMount() {
    showSpinner(true);
    const {
      fetchFavorites,
      userIsLoggedIn,
      userName,
      fetchMovies,
      movies
    } = this.props;
    fetchMovies(movies.searchingMovie);
    if (userIsLoggedIn) {
      fetchFavorites(userName);
    }
  }
  createList = (moviesList, getMovieById, list) => {
    return moviesList[list].map(movie => {
      const { imdbID, Title } = movie;
      return (
        <li className="movie-item" key={imdbID}>
          <h2 className="movie-item-title">{Title}</h2>
          <Link
            onClick={() => this.props.getMovie(movie)}
            to={`/${list}/${imdbID}`}
            className="movie-info"
          >
            +
          </Link>
        </li>
      );
    });
  };
  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    const { movies, getMovieById, list } = this.props;
    const moviesList = this.createList(movies, getMovieById, list);
    return (
      <Fragment>
        <h2 style={{ textAlign: "center" }}>
          {movies[list].length} movies in {list}
        </h2>
        <ul className="movie-list">{moviesList}</ul>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.movies,
  userName: state.user.userName,
  userIsLoggedIn: state.user.isLoggedIn,
  loading: state.loading.loading
});
const mapDispatchToProps = {
  getMovie,
  fetchMovies,
  fetchFavorites,
  showSpinner
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MoviesList)
);
