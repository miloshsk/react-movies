import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <ul className="menu">
        <li>
          <NavLink exact activeClassName="btn-active" className="btn" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="btn-active" className="btn" to="/movies">
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="btn-active" className="btn" to="/favorites">
            Favorites
          </NavLink>
        </li>
      </ul>
    );
  }
}
