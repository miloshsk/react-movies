import React, { Component } from "react";
import "./movie-search.sass";
import { connect } from "react-redux";
import { setSearchingMovie } from "../../actions/movieActions";
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
    this.props.setSearchingMovie(this.state.searchingMovie);
    this.setState({
      searchingMovie: ""
    });
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div className="app-form-wrapper">
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
      </div>
    );
  }
}
const mapDispatchToProps = { setSearchingMovie };
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MoviesSearch)
);
