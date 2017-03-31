var SlickVal = (function(){
	var getOptions = function(validString){
		let options = {};
		validString.split(',').forEach((optionString) => {
			var option = optionString.split('=');
			options[option[0].toLowerCase()] = true;
			// see if it is a key value pair
			if(option.length === 2){
				options[option[0].toLowerCase()] = option[1];
			}
		});
		return JSON.stringify(options);
	};
	var addClass = function(element,add){
		var currentClass = element.getAttribute('class') || "";
		currentClass.split(' ').forEach((c) => {
			if(c === add){
				return;
			}
		});
		element.setAttribute('class',currentClass + ' ' + add);
	};
	var removeClass = function(element,remove){
		var currentClass = element.getAttribute('class') || "";
		var newClass = '';
		currentClass.split(' ').forEach((c)=>{
			if(newClass !== ''){newClass += ' ';}
			if(c !== remove){
				newClass += c;
			}
		});
		element.setAttribute('class',newClass);
	};
	var fadeElement = function(element){
		element.style.opacity = 1;
		(function fade() {
			element.style.opacity -= .05;
			if (element.style.opacity < 0) {
				element.remove();
			} else {
				requestAnimationFrame(fade);
			}
		})();
	};
	var addFailure = function(element,type,message){
		var name = element.getAttribute('name') || 'noname';

		// check for existing failure
		if(document.querySelectorAll('[slickValID='+name+'-'+type+']').length){
			return;
		}

		// create the element
		var failure = document.createElement('div');
		failure.innerText = message;
		failure.setAttribute('slickValID',name+'-'+type);
		addClass(failure,'slickValMessage');
		element.previousSibling.appendChild(failure);
		setTimeout(function(){
			fadeElement(failure);
		},2000);
	};

	var blurFunctions = {};
	var keypressFunctions = {};

	// REQUIRED
	blurFunctions.required = function(event){
		if(event.target.value === ''){
			addFailure(event.target,'required','Required');
		}
	};

	// INTEGER
	keypressFunctions.integer = function(event){
		if(isNaN(event.key) && event.key !== "-"){
			addFailure(event.target,'integer','Must be an Integer');
			event.preventDefault();
		}
	}
	blurFunctions.integer = function(event){
		event.target.value = event.target.value.replace(/ /g,'');
		event.target.value = event.target.value.replace(/[^0-9\-]/g,'');
		event.target.value = event.target.value.replace(/(?!^)-/g,'');
	};

	// EMAIL
	blurFunctions.email = function(event){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
			// ok!!
		} else {
			addFailure(event.target,'email','Invalid Email');
		}
	}
	keypressFunctions.email = function(event){
		if(event.key === ' '){
			addFailure(event.target,'email','No Spaces in emails');
			event.preventDefault();
		}
	}
	// PASSWORD
	blurFunctions.password = function(event){
		if(event.target.value && event.target.value.length < 5){
			addFailure(event.target,'password1','Too short');
		}
		if(event.target.value.indexOf(' ') > -1){
			addFailure(event.target,'password2','No Spaces allowed');
		}
	}

	return{
		init:function(){
			window.addEventListener("DOMContentLoaded",() => {
				this.activateAll();
				this.insertStyles();
			});
			// this kicks it off for react components
			this.activateAll();
			this.insertStyles();
			return this;
		},
		insertStyles:function(){
			if(document.getElementById('slickValStylesheet')){return;}
			var style = document.createElement('style');
			style.setAttribute('id','slickValStylesheet');
			style.innerText = `
				.slickValMessages{
					height:0px;
					position:relative;
					text-align:left;
				}
				.slickValMessage{
					position:relative;
					z-index:100;
					display:inline-block;
					background-color:orangered;
					color:white;
					font-size:11px;
					line-height:11px;
					padding:2px 6px;
					border-radius:3px;
					font-weight:500;
					vertical-align:top;
					margin-top:-3px;
					margin-right:3px;
				}
			`;
			document.head.appendChild(style);
		},
		activateAll:function(){
			// get all the elements
			// make a list of all the forms
			// activate them all
			let elements = document.querySelectorAll('[data-valid]');
			elements.forEach((element) => {
				// get the validation object for element
				let options = getOptions(element.dataset.valid);
				// remove the original attr [data-valid] and replace to indicate it's been activated
				element.setAttribute('data-valid_on',options);
				element.removeAttribute('data-valid');

				if(element.tagName !== 'DIV'){
					// add keypress and focus out events
					element.addEventListener('keypress',(event)=>{
						this.cleanseKeypress(event);
					});
					element.addEventListener('blur',(event)=>{
						this.cleanseBlur(event);
					});
				} else{ // react-select
					// add blur event to the input
					var reactSelectOptions = JSON.parse(options);
					if('required' in reactSelectOptions){
						var input = element.querySelectorAll('[role=combobox]')[0];
						input.addEventListener('blur',(event) => {
							var values = element.querySelectorAll('input[type=hidden]');
							if(values.length === 0){
								this.addFailure(element,'required','Required');
							}
						});
					}
				}
				// prepend a container for validation messages
				var messages = document.createElement('figure');
				messages.setAttribute('class','slickValMessages');
				element.parentNode.insertBefore(messages,element);
			});
		},
		cleanseKeypress:function(event){
			var options = JSON.parse(event.target.dataset.valid_on);
			for(var option in options){
				if(option in keypressFunctions){
					keypressFunctions[option](event);
				}
			}
		},
		cleanseBlur:function(event){
			var options = JSON.parse(event.target.dataset.valid_on);
			for(var option in options){
				if(option in blurFunctions){
					blurFunctions[option](event);
				}
			}
		},
		validateForm:function(formID){
			// remove any validation messages for re-eval
			 var messages = document.getElementsByClassName('slickValMessage');
			 [...messages].forEach((message) => {
				message.remove();
			});

			var form = document.getElementById(formID);
			var elements = form.querySelectorAll('[data-valid_on]');
			elements.forEach((element) => {
				var event = document.createEvent('UIEvents');
				event.initEvent('blur',true,true);
				if(element.tagName !== 'DIV'){ 
					// traditional inputs
					element.dispatchEvent(event);
				} else { 
					// react-select
					var input = element.querySelectorAll('[role=combobox]')[0];
					input.dispatchEvent(event);
				}
			});

			return document.getElementsByClassName('slickValMessage').length === 0;
		},
		addFailure:addFailure,
		getOptions:getOptions
	}
})().init();

module.exports = SlickVal;