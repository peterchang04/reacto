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
			var path = context._toPath(req.url); // array representing the rest nodes
			var func = context._getFunc(req.method,path); // the base function
			var args = context._getArgs(path,req);

			// [0] is the file for resource to require
			var resource = context._getResource(path);
			if(resource === null){
				return context._sendError(res,"Invalid",path[0] + ' is not a valid resource [1]');
			}

			// see if this function exists
			if(!(func in resource)){
				console.log("function " + func + " not found");
				return context._sendError(res,"Invalid",func + ' is not a valid method [2]');
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
		// get rid of empty nodes
		if(result[result.length-1] === ''){
			result.pop();
		}
		return result;
	}
	_sendError(res,message = "Bad Request",detail = "",status = 400){
		res.status(status);
		res.json({message:message,detail:detail});
	}
	_getFunc(method,path){
	var resource = '';
	path.forEach(function(pathNode){
		if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8)){ // is positive integer or GUID
			/* do nothing*/
		} else {
			resource = pathNode;
		}
	});
	return method.toLowerCase() + resource.charAt(0).toUpperCase() + resource.substring(1,resource.length);
	}
	_getArgs(pathArray,req){
		var args = {};
		// find the subject node (it's the last non identifier on path nodes)
		var subject = "";
		pathArray.forEach(function(pathNode){
			if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8)){ // is positive integer or GUID
			/* do nothing */
			} else {
				subject = pathNode;
			}
		});

		// now sort and identifiables into args
		var curSubject = '';
		pathArray.forEach(function(pathNode){
			if(pathNode >>> 0 === parseFloat(pathNode) || (pathNode.length === 36 && pathNode.indexOf('-') === 8)){ // is positive integer or GUID
				if(curSubject === subject){ // the subject becomes just ID instead of subject_id
					curSubject = '';
				}
				var argName = _.snakeCase(curSubject+'Id');
				args[argName] = pathNode;
			} else{
				curSubject = pathNode;
			}
		});

		// attempt to get args out of request
		var reqArgs = {};
		try{
			reqArgs = req.body;
		}catch(e){}

		// merge args and reqArgs
		return Object.assign({},args,reqArgs);
	}
	_getResource(pathArray){
		var resource = null;
		try{
			resource = require('../data/'+pathArray[0]+'DAO');
		}catch(e){
			console.log(e);
		}
		return resource;
	}
	close(){
		console.log('....aaand we\'re done');
		this.server.close();
	}
}

module.exports = new RestListener();