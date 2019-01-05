import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './movie-item.sass';

export default class MovieItem extends Component {
	render() {
		const {Title, Year, Poster} = this.props.movie;
		return (
			<div className="movie">
				<h2 className="movie-title">{Title}</h2>
				<p className="movie-year">{Year}</p>
				<img className="movie-poster" src={Poster} alt=""/>
				<Link to="/" className="btn-return">Back</Link>
			</div>
		)
	}
}