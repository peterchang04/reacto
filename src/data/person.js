var Query = require('../core/dbQuery');
/*TODO - abstract out these to function calls against a DAO object personDAO */
module.exports = {
	/* each DAO starts wilth a base query */
	query:function(cb,args = {},argDef2 = {}){
		// define all possible args and types
		var argDef = {
			personID:['int',false] // [type,required?]
		}
		// combine argDefs
		Object.assign(argDef,argDef2);

		// evaluate
		var c1 = args.personID ? 'and person.id = @personID' : '';
		var query = `
			select *
			from person
			where person.active = 1
			${c1}
		`;

		// create a run query
		var q = new Query(query,args,argDef);
		q.run(cb);
	},
	getPerson:function(cb,args){
		var argDef = {};
		this.query(cb,args,argDef);
	}
}