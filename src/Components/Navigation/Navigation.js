import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { userLogout } from "../../actions/userActions";

class Navigation extends Component {
  logOut = () => {
    this.props.userLogout();
    this.props.history.push(`/`);
  };
  render() {
    const userName = this.props.user.user;
    const isUserLoggedIn = this.props.user.isLoggedIn;
    const showProfile = isUserLoggedIn ? (
      <button className="btn" onClick={this.logOut}>
        Log out
      </button>
    ) : (
      <li>
        <NavLink exact activeClassName="btn-active" className="btn" to="/login">
          Login
        </NavLink>
      </li>
    );
    const showFavButtoon = isUserLoggedIn ? (
      <li>
        <NavLink activeClassName="btn-active" className="btn" to="/favorites">
          Favorites
        </NavLink>
      </li>
    ) : null;
    const showUser = isUserLoggedIn ? (
      <span className="user-field">Welcome {userName}</span>
    ) : null;
    return (
      <Fragment>
        <ul className="menu">
          <li>
            <NavLink exact activeClassName="btn-active" className="btn" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="btn-active" className="btn" to="/movies">
              Movies
            </NavLink>
          </li>
          {showFavButtoon}
          <li>
            <NavLink activeClassName="btn-active" className="btn" to="/sign-up">
              Sign up
            </NavLink>
          </li>
          {showProfile}
        </ul>
        {showUser}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(
  connect(
    mapStateToProps,
    { userLogout }
  )(Navigation)
);
