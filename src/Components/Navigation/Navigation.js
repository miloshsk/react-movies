import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { userLogout } from "../../actions/userActions";
import { menuToggle } from "../../actions/menuActions";
import history from "../../history";
import Burger from "../Burger/Burger";
import Link from "../Link/Link";

class Navigation extends Component {
  logOut = () => {
    this.props.userLogout();
    this.menuToggle();
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
      <Link to="/login" label={"Login"} />
    );
    const showFavButton = isUserLoggedIn ? (
      <Link to="/favorites" label={"Favorites"} />
    ) : null;
    const showUser = isUserLoggedIn ? (
      <span className="user-field">Welcome {userName}</span>
    ) : null;
    return (
      <nav className="page-nav">
        <ul className={`menu ${this.props.isMenuOpen ? "menu-show" : ""}`}>
          <Link to="/" label={"Home"} />
          <Link to="/movies" label={"Movies"} />
          {showFavButton}
          <Link to="/sign-up" label={"Sign up"} />
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
