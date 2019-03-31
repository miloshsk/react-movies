import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { userLogout } from "../../actions/userActions";
import { menuToggle } from "../../actions/menuActions";
import Burger from "../Burger/Burger";
import Link from "../Link/Link";

class Navigation extends Component {
  logOut = () => {
    this.props.userLogout();
    this.burgerToggle();
    this.props.history.push("/");
  };
  burgerToggle = () => {
    if (window.innerWidth < 640) {
      const isMenuShowed = !this.props.isMenuOpen;
      this.props.menuToggle(isMenuShowed);
    }
  };
  render() {
    const userName = this.props.userName;
    const isUserLoggedIn = this.props.userRsLoggedIn;
    const showProfile = isUserLoggedIn ? (
      <button className="btn btn-link" onClick={this.logOut}>
        Sign out
      </button>
    ) : (
      <Link to="/sign-in" label={"Sign in"} />
    );
    const showSignUp = !isUserLoggedIn ? (
      <Link to="/sign-up" label={"Sign up"} />
    ) : null;
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
          {showSignUp}
          {showProfile}
        </ul>
        {showUser}
        <Burger
          burgerToggle={this.burgerToggle}
          isMenuOpen={this.props.isMenuOpen}
        />
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  userName: state.user.userName,
  userRsLoggedIn: state.user.isLoggedIn,
  isMenuOpen: state.menu.isMenuOpen
});
const mapDispatchToProps = { userLogout, menuToggle };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);
