import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { menuToggle } from "../../actions/menuActions";

class Link extends Component {
  menuToggle = () => {
    const isMenuShowed = !this.props.isMenuOpen;
    this.props.menuToggle(isMenuShowed);
  };
  render() {
    return (
      <li>
        <NavLink
          exact
          activeClassName="btn-active"
          className="btn btn-link"
          to={this.props.path}
          onClick={this.menuToggle}
        >
          {this.props.name}
        </NavLink>
      </li>
    );
  }
}
const mapStateToProps = state => ({
  isMenuOpen: state.menu.isMenuOpen
});
export default connect(
  mapStateToProps,
  { menuToggle }
)(Link);
