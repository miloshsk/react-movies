import { combineReducers } from 'redux';
import reducers from  './reducers';
import userReducers from  './userReducers';

export default combineReducers({
	movies: reducers,
	user: userReducers
});