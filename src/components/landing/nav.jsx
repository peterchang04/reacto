import React, { Component } from 'react';
import logo from './img/logos/note_w.png';
import './css/custom.css';
import './nav.css';
import $ from 'jquery';

class C extends Component {
	render() {
		return (
			<nav id="mainNav" className="navbar navbar-default navbar-custom navbar-fixed-top">
				<div className="container">
					{/* Brand and toggle get grouped for better mobile display */}
					<div className="navbar-header page-scroll">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
						</button>
						<a className="navbar-brand page-scroll" href="#page-top">
							<img id="logo" src={logo} alt="" />
							uz.io
						</a>
					</div>

					{/* Collect the nav links, forms, and other content for toggling */}
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a className="page-scroll" href="#portfolio">Features</a>
							</li>
							<li>
								<a className="page-scroll" href="#about">Roadmap</a>
							</li>
							<li>
								<a className="page-scroll" href="#team">Team</a>
							</li>
							<li>
								<a className="page-scroll" href="#contact">Contact</a>
							</li>
							<li>
								<a className="page-scroll" href="#" data-toggle="modal" data-target="#createModal">Login</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
	componentDidMount(){
		var checkTopbar = function(){
			var $nav = $('#mainNav.navbar-fixed-top');
			if($(window).scrollTop() > 0 && !$nav.hasClass('affix')){
				$nav.addClass('affix');
			}
			if($(window).scrollTop() === 0 && $nav.hasClass('affix')){
				$nav.removeClass('affix');
			}
		}

		// logic for scroll nav highlighting
		var $elements = [
			['services'],
			['portfolio'],
			['about'],
			['team'],
			['contact']
		];
		// preload the shits
		$elements.forEach((element) => {
			element.push($('[href="#'+element[0]+'"]'));
			element.push($('#'+element[0]));
		});

		var checkScroll = function(){
			var scrollTop = $(window).scrollTop();
			//console.log(scrollTop + ' : ' + ($elements[4][2].offset().top - 380));

			for(var i = $elements.length-1; i >= 0; i--){
				if(scrollTop > $elements[i][2].offset().top - 380){
					$('ul.navbar-nav li').removeClass('active');
					$elements[i][1].parent().addClass('active');
					return;
				}
			}
			/* if no match */
			$('ul.navbar-nav li').removeClass('active');
		}

		$(window).on('scroll.landing',function(){
			checkTopbar();
			checkScroll();
		})


		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').off('click.landing').on('click.landing',function(){ 
			$('.navbar-toggle:visible').click();
		});

		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$('a.page-scroll').not("[href='#start'],[href='#page-top'],[href='#']").on('click.landing', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top - 50)
			}, 400);
			event.preventDefault();
		});

		checkTopbar();
	}
}

export default C;