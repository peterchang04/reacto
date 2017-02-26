var Query = require('../core/dbQuery');

module.exports = {
	get:function(args){
		var criteria = '';
		if(args.personID){
			criteria = 
		}
		var baseQuery = `
			select *
			from person
			where person.active = 1
			${this.criteria}
		`;
	}
};