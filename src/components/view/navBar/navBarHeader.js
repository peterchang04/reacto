import React, { Component } from 'react';

class NavBarHeader extends Component {
	render() {
		return (
			<div className="navbar-header">
				<ul className="nav navbar-nav">
					<li className="nav-item">
						{/*whether to automatically collapse sidebar on mouseleave. If activated acts more like usual admin templates*/}
						<a className="hidden-md-down nav-link" id="nav-state-toggle" href="#" data-toggle="tooltip" data-html="true" data-original-title="Turn<br>on/off<br>sidebar<br>collapsing" data-placement="bottom">
							<i className="fa fa-bars fa-lg"></i>
						</a>
						{/*shown on xs & sm screen. collapses and expands navigation*/}
						<a className="hidden-lg-up nav-link" id="nav-collapse-toggle" href="#" data-html="true" title="Show/hide<br>sidebar" data-placement="bottom">
							<span className="rounded rounded-lg bg-gray text-white hidden-md-up"><i className="fa fa-bars fa-lg"></i></span>
							<i className="fa fa-bars fa-lg hidden-sm-down"></i>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default NavBarHeader;