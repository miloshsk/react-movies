import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Link extends Component {
	render() {
		return(
		 <li>
			 <NavLink
				exact
				activeClassName="btn-active"
				className="btn btn-link"
				to={this.props.path}
			 >
				 {this.props.name}
			 </NavLink>
		 </li>
		)
	}
};