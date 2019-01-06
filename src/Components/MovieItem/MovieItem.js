import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './movie-item.sass';

export default class MovieItem extends Component {
	addToFavorites = (e) => {
		switch (e.target.textContent) {
			case 'Fav':
				e.target.innerText = 'Unfav';
				this.props.addToFavorites(this.props.movie);
				break;
			case 'Unfav':
				e.target.innerText = 'Fav';
				this.props.removeMovieFromFavorites(this.props.movie);
				break;
			default :
				return;
		}
	};
	render() {
		const {Title, Year, Poster} = this.props.movie;
		const btnText = this.props.findMovieInFavorites(this.props.movie) ? 'Fav' : 'Unfav';
		return (
			<div className="movie">
				<h2 className="movie-title">{Title}</h2>
				<p className="movie-year">{Year}</p>
				<img className="movie-poster" src={Poster} alt=""/>
				<button
					onClick={this.addToFavorites}
					className="btn-favorites">{btnText}</button>
				<Link to="/" className="btn-return">Back</Link>
			</div>
		)
	}
}