import React, { Component } from 'react';
import NavBarHeader from './navBarHeader';
import './navBar.css';

class NavBar extends Component {
	render() {
		return (
			<nav className="page-controls navbar navbar-dashboard">
				<div className="container-fluid">
					<NavBarHeader />
					<div className="collapse navbar-collapse">
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;