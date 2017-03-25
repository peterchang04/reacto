import React, { Component } from 'react';
import img1 from './img/team/1.jpg';
import img2 from './img/team/2.jpg';
import img3 from './img/team/3.jpg';

class C extends Component {
	render() {
		return (
			<section id="team" className="bg-light-gray">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<h2 className="section-heading">Our Amazing Team</h2>
							<h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-4">
							<div className="team-member">
								<img src={img1} className="img-responsive img-circle" alt="" />
								<h4>Kay Garland</h4>
								<p className="text-muted">Lead Designer</p>
								<ul className="list-inline social-buttons">
									<li><a href="#"><i className="fa fa-twitter"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-facebook"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-linkedin"></i></a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="team-member">
								<img src={img2} className="img-responsive img-circle" alt="" />
								<h4>Larry Parker</h4>
								<p className="text-muted">Lead Marketer</p>
								<ul className="list-inline social-buttons">
									<li><a href="#"><i className="fa fa-twitter"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-facebook"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-linkedin"></i></a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="team-member">
								<img src={img3} className="img-responsive img-circle" alt="" />
								<h4>Diana Pertersen</h4>
								<p className="text-muted">Lead Developer</p>
								<ul className="list-inline social-buttons">
									<li><a href="#"><i className="fa fa-twitter"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-facebook"></i></a>
									</li>
									<li><a href="#"><i className="fa fa-linkedin"></i></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8 col-lg-offset-2 text-center">
							<p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default C;