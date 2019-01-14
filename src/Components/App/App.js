import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Navigation from "../Navigation/Navigation";
import Error from "../Error/Error";

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
            <Switch>
              <Route path="/" exact component={MovieSearch} />
              <Route
                path="/movies"
                exact
                render={props => (
                  <MoviesList
                    {...props}
                    list={"movies"}
                    error={this.state.isError}
                  />
                )}
              />
              <Route
                path="/favorites"
                exact
                render={props => (
                  <MoviesList
                    {...props}
                    list={"favorites"}
                    error={this.state.isError}
                  />
                )}
              />
              <Route
                path="/:list/:id"
                exact
                render={props => <MovieItem {...props} />}
              />
              <Route component={Error} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
