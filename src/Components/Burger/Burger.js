import React, { Component } from "react";
import "./burger.sass";

export default class Burger extends Component {
  menuToggle = () => {
    const isMenuShowed = !this.props.isMenuShowed;
    this.props.toggleMobileMenu(isMenuShowed);
  };
  render() {
    return (
      <button
        className={`btn-burger ${
          this.props.isMenuShowed ? "btn-burger-opened" : null
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
