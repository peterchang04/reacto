import React, { Component } from 'react';
import './font-awesome/css/font-awesome.min.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/droid.css';
import './fonts/kausahn.css';
import './fonts/montserrat.css';
import './fonts/robotoSlab.css';
import './css/agency.css';

import Nav from './nav';
import Header from './header';
import Services from './services';
import Features from './features';
import Roadmap from './roadmap';
import Team from './team';
//import Clients from './clients';
import Contact from './contact';
import Footer from './footer';

class C extends Component {
	render() {
		return (
			<div>
				<Nav />
				<Header />
				<Services />
				<Features />
				<Roadmap />
				<Team />
				{/*<Clients />*/}
				<Contact />
				<Footer />
				<script src="js/jqBootstrapValidation.js"></script>
				<script src="js/contact_me.js"></script>
			</div>
		);
	}
}

export default C;