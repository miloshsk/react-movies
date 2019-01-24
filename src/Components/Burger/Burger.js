import React, { Component } from "react";
import "./burger.sass";
import connect from "react-redux/es/connect/connect";
import { menuToggle } from "../../actions/menuActions";

class Burger extends Component {
  menuToggle = () => {
    const isMenuShowed = !this.props.isMenuOpen;
    this.props.menuToggle(isMenuShowed);
  };
  render() {
    return (
      <button
        className={`btn-burger ${
          this.props.isMenuOpen ? "btn-burger-opened" : ""
        }`}
       onClick={this.menuToggle}
      >
        <span className="btn-burger__line btn-burger__line-top" />
        <span className="btn-burger__line btn-burger__line-mid" />
        <span className="btn-burger__line btn-burger__line-bottom" />
      </button>
    );
  }
}
const mapStateToProps = state => ({
  isMenuOpen: state.menu.isMenuOpen
});
export default connect(
  mapStateToProps,
  { menuToggle }
)(Burger);
