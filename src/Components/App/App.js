import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviesList from "../MovieList/MoviesList";
import MovieItem from "../MovieItem/MovieItem";
import Navigation from "../Navigation/Navigation";
import Error from "../Error/Error";
import Login from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

import "normalize.css";
import "./app.sass";
import "./buttons.sass";
import connect from "react-redux/es/connect/connect";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route path="/" exact component={MovieSearch} />
          <Route
            path="/movies"
            exact
            render={props => <MoviesList {...props} list={"movies"} />}
          />
          <Route
            path="/favorites"
            exact
            render={props =>
              this.props.isLoggedIn ? (
                <MoviesList {...props} list={"favorites"} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:list/:id"
            exact
            render={props => <MovieItem {...props} />}
          />
          <Route path="/sign-in" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route component={Error} />
        </Switch>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
