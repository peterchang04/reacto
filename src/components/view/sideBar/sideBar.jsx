import React, { Component } from 'react';
import LinkGroup from './linkGroup';

class SideBar extends Component {
	render() {
		var dataOptions = ["People", "Schools", "School Years", "Enrollment"];
		var clientOptions = ["Browse", "Subscriptions", "Options"];

		return (
			<div id="sidebar" className="sidebar" role="navigation">
				<div className="js-sidebar-content">
					<header className="logo hidden-sm-down">
						<a href="#">Reacto</a>
					</header>
					<ul className="sidebar-nav">
						<LinkGroup name="Data" active={true} icon="hdd" options={dataOptions} />
						<LinkGroup name="Clients" icon="link" options={clientOptions} />
					</ul>
				</div>
			</div>
		);
	}
}

export default SideBar;
