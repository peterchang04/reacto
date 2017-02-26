var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;
var Guid = require('guid');
var Statement = require('./dbStatement');

var dbConnect = (function(){
    var config = {  
        userName: 'pchang',  
        password: 'welcome1',  
        server: 'devdb1.tads.local',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: false, database: 'Cornerstone_prd'}  
    };

    var _Connector = {
        connected:false,
        currentStatement:null, // the current statement instance lives here until success or error callback
        statements:[], // the queued up statements to run
        connection:new Connection(config),
        result:[],
        tryRun:function(){
            if(_Connector.statements.length > 0 && _Connector.connected && _Connector.currentStatement == null){
                var s = _Connector.statements.shift();
                //console.log('TRY '+s.text);
                _Connector.executeStatement(s);
            }
        },
        addStatement:function(text,cb){
            var s = new Statement(text,cb);
            _Connector.statements.push(s);
            //console.log('QUEUE ' + text);
            _Connector.tryRun();
        },
        executeStatement:function(s){
            s.attempts++;
            _Connector.currentStatement = s;
            //console.log('RUN ' + _Connector.currentStatement.text);
            _Connector.result = [];

            var request = new Request(s.text, function(err) {
                /* ERROR */
                if(err){
                    err._statement = s.text;
                    console.log(err);
                    if(_Connector.currentStatement.attempts < 2){
                        _Connector.statements.push(s);
                    }

                /* SUCCESS */   
                } else if(typeof s.cb === 'function'){
                    s.cb(_Connector.result,err);
                }
                _Connector.currentStatement = null;
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
        run:_Connector.addStatement,
        newID:function(){
        var guid = Guid.create();
        return guid;
    }
    };
})();

module.exports = Connector;