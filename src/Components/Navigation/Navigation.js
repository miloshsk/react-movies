import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { userLogout } from "../../actions/userActions";
import history from "../../history";
import Burger from "../Burger/Burger";
import Link from "../Link/Link";

class Navigation extends Component {
  state = {
    isMenuShowed: false
  };
  logOut = () => {
    this.props.userLogout();
    history.push(`/`);
  };
  toggleMobileMenu = info => {
    this.setState({
      isMenuShowed: info
    });
  };
  render() {
    const { user } = this.props;
    const userName = user.user;
    const isUserLoggedIn = user.isLoggedIn;
    const showProfile = isUserLoggedIn ? (
      <button className="btn" onClick={this.logOut}>
        Log out
      </button>
    ) : (
      <Link path={"/login"} name={"Login"} />
    );
    const showFavButton = isUserLoggedIn ? (
      <Link path={"/favorites"} name={"Favorites"} />
    ) : null;
    const showUser = isUserLoggedIn ? (
      <span className="user-field">Welcome {userName}</span>
    ) : null;
    return (
      <nav className="page-nav">
        <ul className={`menu ${this.state.isMenuShowed ? "menu-show" : null}`}>
          <Link path={"/"} name={"Home"} />
          <Link path={"/movies"} name={"Movies"} />
          {showFavButton}
          <Link path={"/sign-up"} name={"Sign up"} />
          {showProfile}
        </ul>
        {showUser}
        <Burger
          toggleMobileMenu={this.toggleMobileMenu}
          isMenuShowed={this.state.isMenuShowed}
        />
      </nav>
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
