var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;
var Guid = require('guid');
var dbRequest = require('./dbRequest');
var dbConfig = require('./config').db;
var Query = require('./dbQuery');

var Connector = (function(){
	var config = {
		userName: dbConfig.username,
		password: dbConfig.password,
		server: dbConfig.server,
		// When you connect to Azure SQL Database, you need these next options.
		options: dbConfig.options
	};

	var _Connector = {
		connected:false,
		currentRequest:null, // the current dbRequest instance lives here until success or error callback
		requests:[], // the queued up requests to run
		connection:new Connection(config),
		result:[],
		tryRun:function(){
			if(_Connector.requests.length > 0 && _Connector.connected && _Connector.currentRequest == null){
				var r = _Connector.requests.shift();
				//console.log('TRY '+s.text);
				_Connector.executeStatement(r);
			}
		},
		addRequest:function(text,params,cb){
			var s = new dbRequest(text,params,cb);
			_Connector.requests.push(s);
			//console.log('QUEUE ' + text);
			_Connector.tryRun();
		},
		executeStatement:function(r){
			r.attempts++;
			_Connector.currentRequest = r;
			//console.log('RUN ' + _Connector.currentRequest.text);
			_Connector.result = [];

			var request = new Request(r.text, function(err) {
				/* ERROR */
				if(err){
					err.text = r.text;
					console.log(err);
					if(_Connector.currentRequest.attempts < 2){
						_Connector.requests.push(r);
					}

				/* SUCCESS */
				} else if(typeof r.cb === 'function'){
					r.cb(_Connector.result,err);
				}
				_Connector.currentRequest = null;
				_Connector.tryRun();
			});

			request.on('row', function(columns) {
				// sort the results
				var rowData = {};
				columns.forEach(function(column) {  
					rowData[column.metadata.colName] = column.value;
				});
				_Connector.result.push(rowData);
			});

			// append any params
			r.params.forEach(function(param){
				request.addParameter(param[0],param[1],param[2]);
			});

			// run it
			_Connector.connection.execSql(request);  
		}
	};

	/* CONNECTION EVENTS */
	_Connector.connection.on('connect', function(err) {  
		// If no error, then good to proceed.  
		console.log("DB Connected");
		_Connector.connected = true;
		_Connector.tryRun();
		if(err){
			console.log(err);
		}
	});

	return {
		run:_Connector.addRequest,
		newID:function(){
			var guid = Guid.create();
			return guid;
		},
		Types:TYPES,
		Query:Query
	};
})();

module.exports = Connector;