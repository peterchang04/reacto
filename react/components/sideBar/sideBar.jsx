import React, { Component } from 'react';
import LinkGroup from './linkGroup';
import './sideBar.css';
import note from './note_w.png';

class SideBar extends Component {
	render() {
		var dataOptions = ["People", "Schools", "School Years", "Enrollment"];
		var clientOptions = ["Browse", "Subscriptions", "Options"];

		return (
			<div id="sidebar" className="sidebar" role="navigation">
				<div className="js-sidebar-content">
					<header className="logo hidden-sm-down">
						<a href="#"><img id="logo" src={note} role="presentation" />uz.io</a>
					</header>

					<ul className="sidebar-nav">
						<li className="active">
							<a href="profile.html">
								<span className="icon">
									<i className="glyphicon glyphicon-user"></i>
								</span>
								Profile
								<sup className="text-warning fw-semi-bold">start here!</sup>
							</a>
						</li>
					</ul>

					<h5 className="sidebar-nav-title">Social</h5>
					<ul className="sidebar-nav">
						<LinkGroup name="Friends" active={true} icon="thumbs-up" options={dataOptions} />
						<LinkGroup name="Near_Me" icon="map-marker" options={clientOptions} />
					</ul>

					<h5 className="sidebar-nav-title">repertoire stats</h5>

					<ul className="sidebar-nav">
						<LinkGroup name="By_Instrument" active={true} icon="bullhorn" options={dataOptions} />
						<LinkGroup name="By_Ensemble" icon="music" options={clientOptions} />
						<LinkGroup name="By_Composer" icon="headphones" options={clientOptions} />
					</ul>
				</div>
			</div>
		);
	}
}

export default SideBar;
