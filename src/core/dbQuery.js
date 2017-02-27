/* Represents a query, with parametized values */
var Types = require('tedious').TYPES;
var db = require('../core/dbConnect');

class Query {
	constructor(text,args,argDef){
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
			this.params.push([
				key,
				this._getType(argDef[key][0]),
				args[key]
			]);
		}
	}
	run(cb){
		db.run(this.text,this.params,cb);
	}
	_getType(str){
		let type = null;
		str = str.toLowerCase();
		if(str === 'int'){
			type = Types.Int;
		}
		if(str === 'uniqueidentifier' || str === 'guid'){
			type = Types.UniqueIdentifier;
		}
		if(str === 'money'){
			type = Types.Money;
		}
		if(str === 'decimal'){
			type = Types.decimal;
		}
		if(str === 'bit'){
			type = Types.Bit;
		}
		if(str === 'datetime'){
			type = Types.Datetime;
		}
		if(!type){
			throw 'Invalid type ['+str+']. Valid types: int, uniqueidentifier, guid, money, decimal, bit, datetime';
		}
		return type;
	}
	_sanitize(str){
		// str.replace(/\s+/g,' '); // this removes and double spaces
		return str;
	}
}

module.exports = Query;