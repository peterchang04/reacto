import React, { Component } from 'react';
import $ from 'jquery';
import './header.css';
import CreateModal from './createModal';

class C extends Component {
	render() {
		return (
			<header>
				<div className="container">
					<div className="intro-text">
						<div className="intro-lead-in">Play Classical Music?</div>
						<div className="intro-heading">get connected</div>
						<button id="createButton" data-toggle="modal" data-target="#createModal" className="page-scroll btn btn-xl">Start Now Free</button>
					</div>
				</div>
				<CreateModal />
			</header>
		);
	}
	componentDidMount(){
		$(window).off('scroll.fixButton').on('scroll.fixButton',() => {
			let scrollTop = $(window).scrollTop();
			let $start = $('button#createButton');
			let startPos = $start.position().top;
			if(scrollTop > startPos){
				if($start.hasClass('fixed')){
					return;
				}
				$start
				.stop()
				.hide()
				.addClass('fixed')
				.css({top:($('#mainNav')
				.outerHeight()+10)+'px'})
				.fadeIn();
			} else{
				$start.removeClass('fixed').stop().show();
			}
		});
	}
}

export default C;