import React, { Component } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewText from "../ReviewText/ReviewText";
import "./movie-item.sass";
import connect from "react-redux/es/connect/connect";
import history from "../../history";
import {
  addFavorites,
  removeFavorites,
  addReview,
  removeReview
} from "../../actions/actions";

class MovieItem extends Component {
  addToFavorites = e => {
    if (e.currentTarget.classList.contains("fav")) {
      this.props.removeFavorites(this.props.movie);
    } else {
      this.props.addFavorites(this.props.movie);
    }
    e.currentTarget.classList.toggle("fav");
  };
  goBack = () => {
    history.push(`/${this.props.match.params.list}`);
  };
  findInFavorites = movie => {
    return this.props.favorites.findIndex(item => {
      return item.imdbID === movie.imdbID;
    });
  };
  render() {
    const { movie } = this.props;
    const { Title, Year, Poster, review } = movie;
    const movieInFavoritesList = this.findInFavorites(movie) !== -1;
    const showFavoriteBtn = this.props.user.isLoggedIn ? (
      <button
        onClick={this.addToFavorites}
        className={`btn btn-favorites ${movieInFavoritesList ? "fav" : " "}`}
      >
        <i className="fas fa-star" />
      </button>
    ) : null;
    let showReview;
    if (
      movieInFavoritesList &&
      !review &&
      this.props.match.params.list === "favorites"
    ) {
      showReview = <ReviewForm getMovie={movie} />;
    } else if (movieInFavoritesList && review) {
      showReview = (
        <ReviewText review={review} removeReview={this.props.removeReview} />
      );
    } else {
      showReview = null;
    }
    return (
      <div className="movie">
        <h2 className="movie__title">{Title}</h2>
        <p className="movie__year">{Year}</p>
        <img className="movie__poster" src={Poster} alt="" />
        <button className="btn btn-return" onClick={this.goBack}>
          Return
        </button>
        {showReview}
        {showFavoriteBtn}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movie: state.movies.movie,
  favorites: state.movies.favorites,
  user: state.user
});
export default connect(
  mapStateToProps,
  { addFavorites, removeFavorites, addReview, removeReview }
)(MovieItem);
