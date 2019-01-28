import React from "react";
import "./burger.sass";

const Burger = ({ isMenuOpen, burgerToggle }) => {
  return (
    <button
      className={`btn-burger ${isMenuOpen ? "btn-burger-opened" : ""}`}
      onClick={burgerToggle}
    >
      <span className="btn-burger__line btn-burger__line-top" />
      <span className="btn-burger__line btn-burger__line-mid" />
      <span className="btn-burger__line btn-burger__line-bottom" />
    </button>
  );
};
export default Burger;
