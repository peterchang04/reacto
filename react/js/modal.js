var $ = require('jquery');
var Modal = (function(){
	return {
		init:function(){
			$(() => {
				this.activateModals();
			});
		},
		activateModals:function(){
			var $modals = $('.modal').not('[data-initted="true"]');
			$modals.attr('data-initted',true);
			$modals.on('shown.bs.modal',function(){
				$(this).find("input:first").focus();
			});
		}
	}
})().init();

module.exports = Modal;