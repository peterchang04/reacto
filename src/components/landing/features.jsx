import React, { Component } from 'react';
import dreams from './img/portfolio/dreams.png';
import escape from './img/portfolio/escape.png';
import golden from './img/portfolio/golden.png';
import treehouse from './img/portfolio/treehouse.png';
import startup from './img/portfolio/treehouse.png';
import round from './img/portfolio/roundicons.png';

class C extends Component {
	render() {
		return (
			<section id="portfolio" className="bg-light-gray">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<h2 className="section-heading">Featuring</h2>
							<h3 className="section-subheading text-muted">Ways to showcase your talent</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal1" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={round} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Education</h4>
								<p className="text-muted">Teachers, Schools, Degrees</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal2" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={startup} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Ensembles</h4>
								<p className="text-muted">Chamber, Symphonic, Bands</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal3" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={treehouse} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Friends</h4>
								<p className="text-muted">Website Design</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal4" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={golden} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Accolades</h4>
								<p className="text-muted">Competitions, Notable positions</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal5" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={escape} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Repertoire</h4>
								<p className="text-muted">What pieces have you performed?</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 portfolio-item">
							<a href="#portfolioModal6" className="portfolio-link" data-toggle="modal">
								<div className="portfolio-hover">
									<div className="portfolio-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src={dreams} className="img-responsive" alt="" />
							</a>
							<div className="portfolio-caption">
								<h4>Your Media</h4>
								<p className="text-muted">Audio, Video, Personal Website</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default C;