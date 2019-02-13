import React, { Component } from "react";
import "./movie-search.sass";
import { connect } from "react-redux";
import { setSearchingResult } from "../../actions/movieActions";
import { withRouter } from "react-router";

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
    this.props.setSearchingResult(this.state.searchingMovie);
    this.setState({
      searchingMovie: ""
    });
    this.props.history.push("/movies");
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
const mapDispatchToProps = { setSearchingResult };
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MoviesSearch)
);
