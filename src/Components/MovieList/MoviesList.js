import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Error from "../Error/Error";
import "./movie-list.sass";

export default class MoviesList extends Component {
  createList = (moviesList, getMovieById, list) => {
    return moviesList[list].map(movie => {
      const { imdbID, Title } = movie;
      return (
        <li className="movie-item" key={imdbID}>
          <h2 className="movie-item-title">{Title}</h2>
          <Link
            onClick={() => getMovieById(movie)}
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
    const { moviesList, error, getMovieById } = this.props;
    const movies = this.createList(moviesList, getMovieById, list);
    return (
      <Fragment>
        {error ? (
          <Error />
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>
              {moviesList[list].length} movies in {this.props.match.params.list}
            </h2>
            <ul className="movie-list">{movies}</ul>
          </div>
        )}
      </Fragment>
    );
  }
}
