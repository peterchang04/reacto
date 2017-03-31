import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import View from './components/view';
import Pages from './components/pages/_pages';
import Landing from './landing/index';

if(false){
	ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/" component={View}>
				<IndexRoute component={Pages.profile}></IndexRoute>
				<Route path="guppy" component={Pages.profile}></Route>
				<Route path="christians" component={Pages.profile}></Route>
			</Route>
		</Router>,
		document.getElementById('view')
	);
} else {
	ReactDOM.render(
		<Landing />
		,document.getElementById('view')
	);
}
