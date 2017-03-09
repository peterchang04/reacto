var $ = require('jquery');
var Modal = (function(){
	return {
		init:function(){
			$(() => {
				this.activateModals();
			})
			return this;
		},
		activateModals:function(){
			var $modals = $('.modal').not('[data-initted="true"]');
			$modals.on('shown.bs.modal',function(){
				$(this).data('data-initted',true);
				$(this).find("input:first").focus();
			});
		}
	}
})().init();

module.exports = {modal:Modal};