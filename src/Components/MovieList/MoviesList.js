import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./movie-list.sass";

export default class MoviesList extends Component {
  createList = () => {
    const { moviesList, getMovieById, list } = this.props;
    return moviesList.map(movie => {
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
    const list = this.createList();
    return <ul className="movie-list">{list}</ul>
  }
}
