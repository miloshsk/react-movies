import React, { Component, Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Navigation from "../Navigation/Navigation";
import Error from "../Error/Error";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import "normalize.css";
import "./app.sass";
import "./buttons.sass";

import { Provider } from "react-redux";
import store from "../../store";

export default class App extends Component {
  state = {
    isError: false
  };
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
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
              <Route path="/login" exact component={Login} />
              <Route path="/sign-up" exact component={SignUp} />
              <Route component={Error} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
