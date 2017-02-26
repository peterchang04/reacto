import React, { Component } from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class LinkGroup extends Component {
	render() {
		var liClass = this.props.active ? "active" : "";
		return (
			<li className={liClass}>
				<a className="collapsed" href={"#sidebar-"+this.props.name} data-toggle="collapse" data-parent="#sidebar">
					<span className="icon">
						<i className={"glyphicon glyphicon-"+this.props.icon}></i>
					</span>
					{this.props.name}
					<i className="toggle fa fa-angle-down"></i>
				</a>
				<ul id={"sidebar-"+this.props.name} className="collapse">
					{this.props.options.map(function(option){
						return <li key={option}><Link to={"/"+option}>{_.capitalize(option)}</Link></li>
					})}
				</ul>
			</li>
		);
	}
}

export default LinkGroup;