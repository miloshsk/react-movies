import React, { Component, Fragment } from 'react';
import {BrowserRouter  as Router, Route} from 'react-router-dom';
import MovieSearch from '../MovieSearch/MovieSearch';
import MoviesList from '../MovieList/MoviesList';
import MovieItem from '../MovieItem/MovieItem';

import Api from '../../api/api';

import Error from '../Error/Error';
import 'normalize.css';
import './app.sass';

export default class App extends Component {
	url = 'https://www.omdbapi.com/?apikey=e99e23f5&s=';
	movieApi = new Api();

	state = {
		movies: [],
		movie: null,
		isError: false
	};

	updateMoviesList = (movies) => {
		this.setState({
			movies: movies,
			isError: false
		});
	};
	getMovie = (id) => {
		const movieId = this.state.movies.findIndex((movie) => {
			return movie.imdbID === id;
		});
		this.setState({
			movie: this.state.movies[movieId]
		});
	};
	showError = () => {
		this.setState({
			isError: true
		})
	};
 	 movieSearch = (movie) => {
		this.movieApi.getMovieList(movie).then((item) => {
			if(item) {
				this.updateMoviesList(item);
			} else {
				this.showError();
			}
		})
	};
  render() {
		const error = this.state.isError ? <Error /> : null;
    return (
    	<Router>
				<Fragment>
						<MovieSearch  movieSearch={this.movieSearch} />
						<Route path="/" exact render={() => {
							return <MoviesList
								getId={this.getMovie}
								moviesList={this.state.movies}/>
						}} />
						{error}
						<Route
							path="/movies/:id"
							render={() => (
								<MovieItem movie={this.state.movie}/>
							)}
					 	/>
				</Fragment>
			</Router>
    )
  }
}

