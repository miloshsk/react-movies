import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./movie-search.sass";

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
    this.props.searchMoviesInAPi(this.state.searchingMovie);
    this.setState({
      searchingMovie: ""
    });
    this.props.history.push("/movies");
  };
  render() {
    return (
      <form className="search-form" onSubmit={this.searchMovie}>
        <input
          className="search-form__input"
          placeholder="Enter a movie"
          onChange={this.typeMovie}
          value={this.state.searchingMovie}
          type="text"
        />
        <button className="btn search-form__submit">Search</button>
      </form>
    );
  }
}
export default withRouter(MoviesSearch);
