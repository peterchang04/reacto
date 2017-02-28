var express = require('express');
var restConf = require('./conf').rest;
var bodyParser = require('body-parser');
var _ = require('lodash');

class RestListener{
	constructor(){
		var context = this;
		this.app = express();
		/* set headers */
		this.app.all('*', function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			next();
		});

		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());


		this.app.all(['/api/*','/api'], function (req, res) {
			var method = req.method.toLowerCase(); // get put delete post etc
			var path = context._toPath(req.url); // array representing the rest nodes
			var args = {}; // args to pass to eventual func
			var resName = "entity";
			var func = method; // the base function
			// [0] is the file for resource to require
			try{
				var resource = require('../data/'+path[0]+'DAO');
				resName = path[0]; // e.g. personID, cityID
				func = context._getFunc(method,resName); // e.g. getPerson, postPerson
				path.shift();
			}catch(e){
				console.log(e);
				return context._sendError(res,"Invalid",path[0] + ' is not a valid resource [1]');
			}

			// loop through the path to build args and function name
			path.forEach(function(item){
				if(!item){return;} // exit if no item
				if(item >>> 0 === parseFloat(item) || (item.length === 36 && item.indexOf('-') === 8)){ // is positive integer or GUID
					args["id"] = item;
				} else {
					resName = item;
					func = context._getFunc(method,resName);
				}
			});

			// see if this function exists
			var hasFunction = false;
			if(!(func in resource)){
				console.log("function " + func + " not found");
				return context._sendError(res,"Invalid",resName + ' is not a valid resource [2]');
			}

			// finally, call the motherfucker
			resource[func](function(results,err){
				if(err){
					console.log(e);
					return context._sendError(res,"Bad Request",'Something went wrong...');
				}
				// success
				res.status(200);
				res.json(results)
			},args);
		});

		/* catch any invalid requests */
		this.app.get('*', function(req, res){
			res.json({message:"invalid request"});
		});

		this.server = this.app.listen(8081, function () {
			var host = context.server.address().address
			var port = context.server.address().port

			console.log("Example app listening at http://%s:%s", host, port)
			console.log(restConf);
		});
	}
	_toPath(url){
		var result = [];
		if(!url){return result}
		// get rid of leading slash
		if(url.charAt(0) === '/'){
			url = url.substring(1,url.length);
		}
		result = url.split('/');
		// get rid of api folder
		if(result[0] === "api"){
			result.shift();
		}
		return result;
	}
	_sendError(res,message = "Bad Request",detail = "",status = 400){
		res.status(status);
		res.json({message:message,detail:detail});
	}
	_getFunc(method,resource){
		return method.toLowerCase() + resource.charAt(0).toUpperCase() + resource.substring(1,resource.length);
	}
	close(){
		console.log('....aaand we\'re done');
		this.server.close();
	}
}

module.exports = new RestListener();