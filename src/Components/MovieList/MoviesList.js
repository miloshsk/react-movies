import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Error from "../Error/Error";
import "./movie-list.sass";
import connect from "react-redux/es/connect/connect";
import { getMovie } from "../../actions/actions";

class MoviesList extends Component {
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
    const { list } = this.props.match.params;
    const { state, error, getMovieById } = this.props;
    const movies = this.createList(state, getMovieById, list);
    return (
      <Fragment>
        {error ? (
          <Error />
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>
              {state[list].length} movies in {this.props.match.params.list}
            </h2>
            <ul className="movie-list">{movies}</ul>
          </div>
        )}
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
    { getMovie }
  )(MoviesList)
);
