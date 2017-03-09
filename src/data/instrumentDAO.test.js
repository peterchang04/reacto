var Request = require('superagent');
var RL = require('../core/restListener');
var util = require('util');

it('Needs some time for the Listener to spin up',function(done){
	setTimeout(function(){
		done();
	},700);
});

it('Can select all instruments',function(done){
	Request.get('localhost:8081/api/instrument')
	.end(function(err,res){
		if(err){
			//console.log(err.response.text);
			expect(err.response.text).toEqual('No Error');
		} else {
			var result = JSON.parse(res.text);
			expect(+result.length).toBeGreaterThan(1);
		}
		done();
	});
});


it('Can select by ID',function(done){
	Request.get('localhost:8081/api/instrument/1')
	.end(function(err,res){
		if(err){
			//console.log(err.response.text);
			expect(err.response.text).toEqual('No Error');
		} else {
			var result = JSON.parse(res.text);
			expect(+result.length).toEqual(1);
		}
		RL.close();
		done();
	});
});
/*
it('Can search by name',function(done){
	instrumentDAO.getInstrument(function(results){
		expect(results.length).toEqual(1);
		done();
	},{search:"violin"});
});
*/
it('Shut it off',function(done){
	RL.close();
	setTimeout(function(){
		done();
	},500);
});
