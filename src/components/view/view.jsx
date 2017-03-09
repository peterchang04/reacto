import React, { Component } from 'react';
import SideBar from './sideBar/sideBar';
import NavBar from './navBar/navBar';

class View extends Component {
  render() {
    return (
    	<div className="view">
	    	<SideBar />
	    	<NavBar />
	    	
	    	<div className="content-wrap">
	    		<main id="content" className="content" role="main">

					{/*<ol className="breadcrumb">
						<li>VIEWING</li>
						<li className="active">xx</li>
					</ol>*/}

					{this.props.children}
	    		</main>
	    	</div>
    	</div>
    );
  }
}

export default View;
