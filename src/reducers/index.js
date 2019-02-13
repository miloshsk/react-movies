import { combineReducers } from 'redux';
import moviesReducers from './moviesReducers';
import userReducers from  './userReducers';
import menuReducers from  './menuReducers';
import loadingReducers from './loadingReducers';

export default combineReducers({
	movies: moviesReducers,
	user: userReducers,
	menu: menuReducers,
	loading: loadingReducers
});