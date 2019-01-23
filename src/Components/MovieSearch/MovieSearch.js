import React, { Component } from "react";
import "./movie-search.sass";
import { connect } from "react-redux";
import { fetchMovies } from "../../actions/actions";
import history from "../../history";
class MoviesSearch extends Component {
  state = {
    searchingMovie: ""
  };
  typeMovie = e => {
    this.setState({
      searchingMovie: e.target.value
    });
  };
  searchMovie = e => {
    e.preventDefault();
    this.props.fetchMovies(this.state.searchingMovie);
    this.setState({
      searchingMovie: ""
    });
    history.push("/movies");
  };
  render() {
    return (
      <form className="search-form" onSubmit={this.searchMovie}>
        <input
          className="search-form__input app-input"
          placeholder="Enter a movie"
          onChange={this.typeMovie}
          value={this.state.searchingMovie}
          type="text"
        />
        <button className="btn btn-form search-form__submit">Search</button>
      </form>
    );
  }
}
export default connect(
  null,
  { fetchMovies }
)(MoviesSearch);
