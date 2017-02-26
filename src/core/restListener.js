var express = require('express');
var app = express();
var router = express.Router();
var restConf = require('./config').rest;
var bodyParser = require('body-parser');
var _ = require('lodash');

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all(['/api/*','/api'], function (req, res) {
	var method = req.method.toLowerCase(); // get put delete post etc
	var path = toPath(req.url); // array representing the rest nodes
	var args = {}; // args to pass to eventual func
	var resName = "entity";
	var func = method; // the base function
	// [0] is the file for resource to require
	try{
		var resource = require('../data/'+path[0]);
		resName = path[0]; // e.g. personID, cityID
		func = getFunc(method,resName); // e.g. getPerson, postPerson
		path.shift();
	}catch(e){
		return sendError(res,"Invalid",path[0] + ' is not a valid resource [1]');
	}
	// loop through the path to build args and function name
	path.forEach(function(item){
		if(!item){return;} // exit if no item
		if(item >>> 0 === parseFloat(item)){ // is positive integer
			args[resName+"ID"] = item;
		} else {
			resName = item;
			func = getFunc(method,resName);
		}
	});
	// see if this function exists
	var hasFunction = false;
	if(!(func in resource)){
		return sendError(res,"Invalid",resName + ' is not a valid resource [2]');
	}

	// finally, call the motherfucker
	resource[func](function(results,err){
		if(err){
			console.log('Error Yo!');
			return sendError(res,"Bad Request",'Something went wrong...');
		}
		// success
		res.status(200);
		res.json(results)
	},args);
})

app.get('*', function(req, res){
	res.json({message:"invalid request"});
});

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
	console.log(restConf);
});

// Utility functions
toPath = function(url){
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

sendError = function(res,message = "Bad Request",detail = "",status = 400){
	res.status(status);
	res.json({message:message,detail:detail});
};
getFunc = function(method,resource){
	return method.toLowerCase() + resource.charAt(0).toUpperCase() + resource.substring(1,resource.length);
}