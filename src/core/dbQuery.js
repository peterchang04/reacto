/* Represents a query, with parametized values */
var Types = require('tedious').TYPES;
var db = require('./db');

class Query {
	/*	CONSTRUCTOR ARGS 
		[text, args, argDef] // select query
		[args, argDef]  // generates an insert or update statement depending on args
	*/
	constructor(arg1,arg2,arg3){
		if(arguments.length == 3){
			var text = arg1;
			var args = arg2;
			var argDef = arg3;
		}

		if(arguments.length == 2){
			var text = this._generateInsertModifyText(arg1); // pass by reference
			var args = arg1;
			var argDef = arg2;
		}

		if(arguments.length == 1){
			var text = arg1;
		}

		this.text = this._sanitize(text);
		// check arguments for required
		for(let key in argDef){
			if(argDef[key][1] && !(key in args)){
				throw key + ' is required.'; 
			}
		}
		// format the args into array
		this.params = [];
		for(let key in args){
			console.log(key);
			var type = this._getType(argDef[key][0]);
			this.params.push([
				key,
				type,
				args[key]
			]);
		}
	}
	run(cb){
		db.run(this.text,this.params,cb);
	}
	_generateInsertModifyText(obj){
		// lcase all keys
		for(var key in obj){
			var temp = obj[key];
			delete obj[key];
			obj[key.toLowerCase()] = temp;
		}
		if(!('table' in obj)){
			throw '[table] required for insert/update';
		}

		var table = obj.table;
		delete obj.table;

		// insert or update
		if(obj["id"]){
			var setStatement = '';
			for(var column in obj){
				if(obj[column] === 'getDate()'){
					setStatement = setStatement + `,${column} = getDate()`;
				} else {
					setStatement = setStatement + `,${column} = @${column}`;
				}
			}

			var text = `
				update [${table}] 
				set modified_on = getDate()
				${setStatement};

				select @id as id;
			`;
		} else {
			var columns = '';
			var values = '';
			for(var column in obj){
				columns = columns + `,${column}`;
				if(obj[column] == 'getDate()'){
					values = values + ',getDate()'; // use database getDate()
				} else {
					values = values + `,@${column}`; // normal argument
				}
			}
			var text = `
				declare @id uniqueidentifier;
				set @id = newID();

				insert into [${table}] (
					id
					${columns}
					,created_on
					,modified_on
					,active
				) values (
					@id
					${values}
					,getDate()
					,getDate()
					,1
				)

				select @id as id
			`;
		}
		return text;
	}
	_getType(str){
		str = str.toLowerCase();
		var Ts = {
			int:Types.Int,
			uniqueidentifier:Types.UniqueIdentifier,
			money:Types.Money,
			decimal:Types.Decimal,
			bit:Types.Bit,
			datetime:Types.DateTime,
			varchar:Types.VarChar
		};
		let type = Ts[str];

		if(!type){
			throw 'Invalid type ['+str+']. Valid types: int, uniqueidentifier, guid, money, decimal, bit, datetime';
		}
		return type;
	}
	_sanitize(str){
		str.replace(/\s+/g,' '); // this removes and double spaces
		return str;
	}
}

module.exports = Query;