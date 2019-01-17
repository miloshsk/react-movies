import React, { Component } from "react";
import Review from "../Review/Review";
import "./movie-item.sass";
import connect from "react-redux/es/connect/connect";
import {
	addFavorites,
  removeFavorites,
  addReview
} from "../../actions/actions";

class MovieItem extends Component {
  addToFavorites = e => {
    switch (e.target.textContent) {
      case "Fav":
        e.target.innerText = "Unfav";
        this.props.addFavorites(this.props.movie);
        break;
      case "Unfav":
        e.target.innerText = "Fav";
        this.props.removeFavorites(this.props.movie);
        break;
      default:
        return;
    }
  };
  goBack = () => {
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
		const movieIsNotFavorite = this.findInFavorites(movie) === -1;
    const isLoggedIn = this.props.user.isLoggedIn;
		const btnText = movieIsNotFavorite ? "Fav" : "Unfav";
    const showBtn = isLoggedIn ? <button onClick={this.addToFavorites} className="btn btn-favorites">
			{btnText}
		</button> : null ;
    const showReview =
      !movieIsNotFavorite && !review ? (
        <Review getMovie={movie} />
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
        {showBtn}
        {showReview}
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
    { addFavorites, removeFavorites, addReview }
  )(MovieItem)
