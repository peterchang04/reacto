import React, { Component } from 'react';
import envato from './img/logos/envato.jpg';
import designmodo from './img/logos/designmodo.jpg';
import themeforest from './img/logos/themeforest.jpg';
import creative from './img/logos/creative-market.jpg';

class C extends Component {
	render() {
		return (
			<aside className="clients">
				<div className="container">
					<div className="row">
						<div className="col-md-3 col-sm-6">
							<a href="#">
								<img src={envato} className="img-responsive img-centered" alt=""/>
							</a>
						</div>
						<div className="col-md-3 col-sm-6">
							<a href="#">
								<img src={designmodo} className="img-responsive img-centered" alt=""/>
							</a>
						</div>
						<div className="col-md-3 col-sm-6">
							<a href="#">
								<img src={themeforest} className="img-responsive img-centered" alt=""/>
							</a>
						</div>
						<div className="col-md-3 col-sm-6">
							<a href="#">
								<img src={creative} className="img-responsive img-centered" alt=""/>
							</a>
						</div>
					</div>
				</div>
			</aside>
		);
	}
}

export default C;