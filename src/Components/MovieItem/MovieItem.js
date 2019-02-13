import React, { Component } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewText from "../ReviewText/ReviewText";
import "./movie-item.sass";
import connect from "react-redux/es/connect/connect";
import { database } from "../../firebase/firebase";
import { setReview } from "../../actions/movieActions";
import { withRouter } from "react-router";

class MovieItem extends Component {
  toggleFavorites = e => {
    const { userName, movie } = this.props;
    if (e.currentTarget.classList.contains("fav")) {
      database.ref(`favorites/${userName}/${movie.Title}`).remove();
    } else {
      database.ref(`favorites/${userName}/${movie.Title}`).set({
        ...movie
      });
    }
    e.currentTarget.classList.toggle("fav");
  };
  return = () => {
    this.props.history.push(`/${this.props.match.params.list}`);
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
    const showFavoriteBtn = this.props.userIsLoggedIn ? (
      <button
        onClick={this.toggleFavorites}
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
        <ReviewText
          movie={this.props.movie}
          user={this.props.userName}
          review={review}
          setReview={this.props.setReview}
        />
      );
    } else {
      showReview = null;
    }
    return (
      <div className="movie">
        <h2 className="movie__title">{Title}</h2>
        <p className="movie__year">{Year}</p>
        <img className="movie__poster" src={Poster} alt="" />
        <button className="btn btn-return" onClick={this.return}>
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
  userName: state.user.userName,
  userIsLoggedIn: state.user.isLoggedIn
});
export default withRouter(
  connect(
    mapStateToProps,
    { setReview }
  )(MovieItem)
);
