import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view/view';
import {Router, IndexRoute, Route, Link, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers/index';

const store = createStore(allReducers);

const Guppy = () => <h1 className="page-title">List - <span className="fw-semi-bold">Guppy</span></h1>;
const People = () => <h1 className="page-title">List - <span className="fw-semi-bold">People</span></h1>;
const Christians = () => <h1 className="page-title">List - <span className="fw-semi-bold">Christians</span></h1>;

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={View}>
				<IndexRoute component={People}></IndexRoute>
				<Route path="guppy" component={Guppy}></Route>
				<Route path="christians" component={Christians}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('view')
);