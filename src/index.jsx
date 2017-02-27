import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view/view';
import {Router, IndexRoute, Route, Link, browserHistory} from 'react-router';

const Guppy = () => <h1 className="page-title">List - <span className="fw-semi-bold">Guppy</span></h1>;
const People = () => <h1 className="page-title">List - <span className="fw-semi-bold">People</span></h1>;
const Christians = () => <h1 className="page-title">List - <span className="fw-semi-bold">Christians</span></h1>;

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={View}>
			<IndexRoute component={People}></IndexRoute>
			<Route path="guppy" component={Guppy}></Route>
			<Route path="christians" component={Christians}></Route>
		</Route>
	</Router>,
	document.getElementById('view')
);