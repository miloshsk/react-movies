import React, { Component } from "react";
import Review from "../Review/Review";
import "./movie-item.sass";

export default class MovieItem extends Component {
  addToFavorites = e => {
    switch (e.target.textContent) {
      case "Fav":
        e.target.innerText = "Unfav";
        this.props.addMovieToFavorites(this.props.movie);
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
  goBack = () => {
    this.props.history.push(`/${this.props.match.params.list}`);
  };
  render() {
    const { Title, Year, Poster, review } = this.props.movie;
    const movieIsNotFavorite =
      this.props.findMovieId("favorites", this.props.movie) === -1;
    const btnText = movieIsNotFavorite ? "Fav" : "Unfav";
    const showReview =
      !movieIsNotFavorite && !review ? (
        <Review getMovie={this.props.movie} addReview={this.addReview} />
      ) : (
        null || <p>{review}</p>
      );

    return (
      <div className="movie">
        <h2 className="movie__title">{Title}</h2>
        <p className="movie__year">{Year}</p>
        <img className="movie__poster" src={Poster} alt="" />
        <button className="btn btn-return" onClick={this.goBack}>
          Back
        </button>
        <button onClick={this.addToFavorites} className="btn btn-favorites">
          {btnText}
        </button>
        {showReview}
      </div>
    );
  }
}
