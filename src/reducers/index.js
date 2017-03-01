import {combineReducers} from 'redux';
import Reducer_profile from './reducer-profile'; 

const allReducers = combineReducers({
	profile:Reducer_profile
});

module.exports = allReducers;