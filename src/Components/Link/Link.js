import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { menuToggle } from "../../actions/menuActions";

class Link extends Component {
  burgerToggle = () => {
    if (window.innerWidth < 640) {
      const isMenuShowed = !this.props.isMenuOpen;
      this.props.menuToggle(isMenuShowed);
    }
  };
  render() {
    return (
      <li>
        <NavLink
          to={this.props.to}
          className="btn btn-link"
          activeClassName="btn-active"
          exact
          onClick={this.burgerToggle}
        >
          {this.props.label}
        </NavLink>
      </li>
    );
  }
}
const mapStateToProps = state => ({
  isMenuOpen: state.menu.isMenuOpen
});
export default withRouter(
  connect(
    mapStateToProps,
    { menuToggle }
  )(Link)
);
