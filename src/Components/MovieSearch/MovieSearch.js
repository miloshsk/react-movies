import React,{Component} from 'react';
import './movie-search.sass';

export default class MoviesSearch extends Component {
	state = {
		searchingMovie: ''
	};
	typeMovie =(e) => {
		this.setState({
			searchingMovie: e.target.value
		})
	};
	searchMovie = (e) => {
		e.preventDefault();
		this.props.movieSearch(this.state.searchingMovie);
		this.setState({
			searchingMovie: ''
		})
	};
	render() {
		return (
			<form className="search-form"
						onSubmit={this.searchMovie}>
				<input
					className="search-form__input"
					placeholder="Enter a movie"
					onChange={this.typeMovie}
					value={this.state.searchingMovie}
					type="text"/>
				<button
					className="search-form__submit"
				>Search</button>
			</form>
		)
	}
}