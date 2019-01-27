import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { userLogout } from "../../actions/userActions";
import { menuToggle } from "../../actions/menuActions";
import history from "../../history";
import Burger from "../Burger/Burger";

class Navigation extends Component {
  logOut = () => {
    this.props.userLogout();
    history.push(`/`);
  };
  menuToggle = () => {
    if (window.innerWidth < 640) {
      const isMenuShowed = !this.props.isMenuOpen;
      this.props.menuToggle(isMenuShowed);
    }
  };
  render() {
    const { user } = this.props;
    const userName = user.user;
    const isUserLoggedIn = user.isLoggedIn;
    const showProfile = isUserLoggedIn ? (
      <button className="btn btn-link" onClick={this.logOut}>
        Log out
      </button>
    ) : (
      <li>
        <NavLink
          exact
          activeClassName="btn-active"
          className="btn btn-link"
          to="/login"
          onClick={this.menuToggle}
        >
          Login
        </NavLink>
      </li>
    );
    const showFavButton = isUserLoggedIn ? (
      <li>
        <NavLink
          exact
          activeClassName="btn-active"
          className="btn btn-link"
          to="/favorites"
          onClick={this.menuToggle}
        >
          Favorites
        </NavLink>
      </li>
    ) : null;
    const showUser = isUserLoggedIn ? (
      <span className="user-field">Welcome {userName}</span>
    ) : null;
    return (
      <nav className="page-nav">
        <ul className={`menu ${this.props.isMenuOpen ? "menu-show" : ""}`}>
          <li>
            <NavLink
              exact
              activeClassName="btn-active"
              className="btn btn-link"
              to="/"
              onClick={this.menuToggle}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="btn-active"
              className="btn btn-link"
              to="/movies"
              onClick={this.menuToggle}
            >
              Movies
            </NavLink>
          </li>
          {showFavButton}
          <li>
            <NavLink
              exact
              activeClassName="btn-active"
              className="btn btn-link"
              to="/sign-up"
              onClick={this.menuToggle}
            >
              Sign up
            </NavLink>
          </li>
          {showProfile}
        </ul>
        {showUser}
        <Burger />
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  isMenuOpen: state.menu.isMenuOpen
});
export default withRouter(
  connect(
    mapStateToProps,
    { userLogout, menuToggle }
  )(Navigation)
);
