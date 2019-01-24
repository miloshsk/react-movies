import { combineReducers } from 'redux';
import reducers from  './reducers';
import userReducers from  './userReducers';
import menuReducers from  './menuReducers';

export default combineReducers({
	movies: reducers,
	user: userReducers,
	menu: menuReducers
});