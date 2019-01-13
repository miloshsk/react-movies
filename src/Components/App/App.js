import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Navigation from "../Navigation/Navigation";

import "normalize.css";
import "./app.sass";

import { Provider } from "react-redux";
import store from "../../store";

export default class App extends Component {
  state = {
    isError: false
  };
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navigation />
            <Route path="/" exact component={MovieSearch} />
            <Route path="/error" />
            <Route
              path="/:list"
              exact
              render={props => (
                <MoviesList {...props} error={this.state.isError} />
              )}
            />
            <Route
              path="/:list/:id"
              exact
              render={props => <MovieItem {...props} />}
            />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
