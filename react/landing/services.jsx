import React, { Component } from 'react';

class C extends Component {
	render() {
		return (
			<section id="services">
				<div className="container">
					<div className="row">
					    <div className="col-lg-12 text-center">
					        <h2 className="section-heading">The First 3 Questions</h2>
					        <h3 className="section-subheading text-muted">When you log in. To help us streamline your experience.</h3>
					    </div>
					</div>
					<div className="row text-center">
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fa fa-circle fa-stack-2x text-primary"></i>
								<i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
							</span>
							<h4 className="service-heading">Instrument(s)</h4>
							<p className="text-muted">Which instruments do you play?</p>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fa fa-circle fa-stack-2x text-primary"></i>
								<i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
							</span>
							<h4 className="service-heading">Your Location</h4>
							<p className="text-muted">Helps us match you up with organizations near you</p>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fa fa-circle fa-stack-2x text-primary"></i>
								<i className="fa fa-lock fa-stack-1x fa-inverse"></i>
							</span>
							<h4 className="service-heading">Ensemble Type</h4>
							<p className="text-muted">Play in a Symphony as well as a String Quartet? No Problem!</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default C;