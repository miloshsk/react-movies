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
    const userName = this.props.userState.user;
    const isUserLoggedIn = this.props.userState.isLoggedIn;
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
        <Burger
          burgerToggle={this.burgerToggle}
          isMenuOpen={this.props.isMenuOpen}
        />
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  userState: state.user,
  isMenuOpen: state.menu.isMenuOpen
});
export default withRouter(
  connect(
    mapStateToProps,
    { userLogout, menuToggle }
  )(Navigation)
);
