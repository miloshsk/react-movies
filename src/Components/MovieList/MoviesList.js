import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./movie-list.sass";
import connect from "react-redux/es/connect/connect";
import { getMovie, fetchMovies } from "../../actions/actions";

class MoviesList extends Component {
  componentDidMount() {
    this.props.fetchMovies(this.props.state.searchingMovie);
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
    const { state, getMovieById, list } = this.props;
    const movies = this.createList(state, getMovieById, list);
    return (
      <Fragment>
        <h2 style={{ textAlign: "center" }}>
          {state[list].length} movies in {list}
        </h2>
        <ul className="movie-list">{movies}</ul>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  state: state.movies
});
export default withRouter(
  connect(
    mapStateToProps,
    { getMovie, fetchMovies }
  )(MoviesList)
);
