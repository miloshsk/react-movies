import React, { Component } from "react";
import { Link } from "react-router-dom";
import Review from "../Review/Review";
import "./movie-item.sass";

export default class MovieItem extends Component {
  addToFavorites = e => {
    switch (e.target.textContent) {
      case "Fav":
        e.target.innerText = "Unfav";
        this.props.addToFavorites(this.props.movie);
        break;
      case "Unfav":
        e.target.innerText = "Fav";
        this.props.removeMovieFromFavorites(this.props.movie);
        break;
      default:
        return;
    }
  };
  addReview = (review, movie) => {
    this.props.addReview(review, movie);
  };
  render() {
    const { Title, Year, Poster, review } = this.props.movie;
    const movieInFavorites =
      this.props.findMovieInFavorites(this.props.movie) === -1;
    const btnText = movieInFavorites ? "Fav" : "Unfav";
    const showReview =
      !movieInFavorites && !review ? (
        <Review getMovie={this.props.movie} addReview={this.addReview} />
      ) : (
        null || <p>{review}</p>
      );

    return (
      <div className="movie">
        <h2 className="movie__title">{Title}</h2>
        <p className="movie__year">{Year}</p>
        <img className="movie__poster" src={Poster} alt="" />
        <button onClick={this.addToFavorites} className="btn btn__favorites">
          {btnText}
        </button>
        <Link to="/" className="btn btn__return">
          Back
        </Link>
        {showReview}
      </div>
    );
  }
}
