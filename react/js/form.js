var SlickVal = require('./slickValidate');
var Form = (function(){
	return {
		getValue:function(formID){
			var values = {};
			var form = document.getElementById(formID);
			if(!form){return values;}
			// inputs
			var inputs = form.getElementsByTagName('input');
			[...inputs].forEach((input) => {
				if(input.name){
					values[input.name.toLowerCase()] = input.value;
				}
			});
			// selects
			// checkboxes
			// radios
			return values;
		},
		validate:function(formID){
			return SlickVal.validateForm(formID);
		}
	}
})();

module.exports = Form;