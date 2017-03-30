import React, { Component } from 'react';
import pic from './kim.jpg';
import './profile.css';

class C extends Component {
	render() {
		return (
			<div>
				<h1 className="page-title">My <span className="fw-semi-bold">Profile</span></h1>
				<div className="row">
					<div className="col-lg-6">
						<section className="widget user-profile">
							<img alt="" src={pic} />
						</section>
						<section className="widget">
							<div className="row">
								<div className="col-lg-6">
									<h5>Peter J Chang</h5>
								</div>
								<div className="col-lg-6">
									as;dlfkj
									as;dflkja
									lkajsdf
								</div>
							</div>
						</section>
					</div>

					<div className="col-lg-6">
						<section className="widget">
							<h5>
								My <span className="fw-semi-bold">Instruments</span>
							</h5>
							<br />
							<button className="btn btn-primary btn-sm width-100 mb-xs">Add</button>
						</section>

						<section className="widget">
							<h5>
								My <span className="fw-semi-bold">Ensembles</span>
							</h5>
							<br />
							<button className="btn btn-primary btn-sm width-100 mb-xs">Add</button>
						</section>

						<section className="widget">
							<h5>
								My <span className="fw-semi-bold">Education</span>
							</h5>
							<br />
							<button className="btn btn-primary btn-sm width-100 mb-xs">Add</button>
						</section>
					</div>
				</div>
			</div>
		);
	}
}

export default C;