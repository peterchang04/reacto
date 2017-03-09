var Query = require('../core/dbQuery');
var Save = require('../core/dbQuerySave');
var Remove = require('../core/dbQueryRemove');
/*TODO - abstract out these to function calls against a DAO object personDAO */
module.exports = {
	getPerson:function(cb,args = {}){
		var argDef = {id:["int",false]};
		var c1 = args.id ? 'and person.id = @id' : '';
		var query = `
			select 
			person.*,
			stuff(
				(
					select ',' + cast(instrument.id as varchar(10))
					from instrument
					inner join person_instrument on person_instrument.instrument_id = instrument.id
						and person_instrument.active = 1
						and person_instrument.person_id = person.id
						where instrument.active = 1
						order by instrument.id asc
						for xml path('')
				)
			,1,1,'') as instrument_ids
			from person
			where person.active = 1
			${c1}
		`;

		new Query(query,args,argDef).run(cb);
	},
	postPerson:function(cb,args){
		var newPerson = (!args.id) ? true : false;
		var context = this;
		var afterSaveInstruments = (res,err) =>{
			if(err){
				console.log(err);
				return cb([],err);
			} 
			// finally
			var payload = [{id:args.person_id}];
			
			cb(payload,err);
		};

		var afterClearInstruments = (res,err) => {
			if(err){
				console.log(err);
				return cb([],err);
			} 
			this._savePersonInstruments(afterSaveInstruments,{
				person_id:args.person_id,
				instrumentids:args.instrumentids
			});
		};

		var afterSavePerson = (res,err) =>{
			if(err){
				console.log(err);
				return cb([],err);
			} 
			args.person_id = res[0].id;
			this._clearPersonInstruments(afterClearInstruments,{
				person_id:res[0].id
			});
		};

		this._savePerson(afterSavePerson,{
			first_name:args.first_name,
			middle_name:args.middle_name,
			last_name:args.last_name,
			email:args.email
		});
	},
	deletePerson:function(cb,args){
		args.table = "person";
		var argDef = {id:['int',true]};
		new Remove(args,argDef).run(cb);
	},
	_savePerson:function(cb,args){
		args.table = 'person';
		if(args.id){ //update
			var argDef = {
				id:["int",true],
				first_name:['varchar',false],
				middle_name:['varchar',false],
				last_name:['varchar',false],
				email:['varchar',false]
			};
		} else { // create
			var argDef = {
				first_name:['varchar',true],
				middle_name:['varchar',false],
				last_name:['varchar',true],
				email:['varchar',true]
			};
		}
		new Save(args,argDef).run(cb);
	},
	_savePersonInstruments:function(cb,args){
		var instrumentIDs = args.instrumentids.split(',');
		var counter = 0;
			instrumentIDs.forEach((instrumentID) => {
			this._savePersonInstrument((res2,err2) => {
				if(err2){
					console.log(err2);
					cb(res2,err2);
					cb = () => {};
					return;
				} else {
					counter++;
					if(counter === instrumentIDs.length){
						cb([]);
					}
				}
			},{
				person_id:args.person_id,
				instrument_id:instrumentID
			});
		});
	},
	_clearPersonInstruments:function(cb,args){
		delete args.method;
		var query = `
			update person_instrument
			set active = 0
			where person_instrument.active = 1
			and person_instrument.person_id = @person_ID;

			select id from person_instrument
			where person_instrument.active = 1
			and person_instrument.person_id = @person_ID;
		`;
		var argDef = {person_id:['int',true]};

		new Query(query,args,argDef).run(cb);
	},
	_savePersonInstrument:function(cb,args){
		args.table = "person_instrument";
		delete args.method;
		var argDef = {
			person_id:["int",true],
			instrument_id:["int",true]
		}
		new Save(args,argDef).run(cb);
	}
}