var RL = null;

it('takes a bit for RestListener to start listening',function(done){
	RL = require('./restListener');
	setTimeout(function(){
		done();
	},1500);
});

it('correctly translates function names',function(){
	expect.assertions(3);
	var test1 = RL._getFunc('get',["test","123","testCase","567"]);
	var test2 = RL._getFunc('get',["test"]);
	var test3 = RL._getFunc('post',["test","123"]);
	expect(test1).toEqual('getTestCase');
	expect(test2).toEqual('getTest');
	expect(test3).toEqual('postTest');
});

it('correctly create paths',function(){
	expect.assertions(2);
	var path1 = RL._toPath('/person/123');
	var path2 = RL._toPath('/goats/5123/udders/123');
	expect(path1).toEqual(["person","123"]);
	expect(path2).toEqual(["goats","5123","udders","123"]);
});

it('gets the correct resource',function(){
	var resource = RL._getResource(["instrument","123"]);
	if(resource === null){
		expect(resource).toEqual('not null');
	}else{
		expect(1).toEqual(1);
	}
});

it('fails gracefully with missing resource',function(){
	var resource = RL._getResource(["llama","123"]);
	if(resource === null){
		expect(resource).toEqual(null);
	}else{
		expect(1).toEqual(0);
	}
});

it('generates the correct arguments',function(){
	var args = RL._getArgs(["test","123"]);
	expect(args).toEqual({
		id:"123"
	});
});

it('generates the correct arguments again',function(){
	var args = RL._getArgs(["test","123","test_run","156"]);
	expect(args).toEqual({
		id:"156",
		test_id:"123"
	});
});

it('generates the correct arguments (no args)',function(){
	var args = RL._getArgs(["test"]);
	expect(args).toEqual({});
});

it('merges the correct args',function(){
	var args1 = RL._getArgs(
		["test","123","test_run","456"],
		{body:{"id":"999","llama":"chris"}}
	);
	expect(args1).toEqual({
		id:"999",
		test_id:"123",
		llama:"chris"
	});
});

it('power it all down',function(){
	RL.close();
	expect(1).toEqual(1);
});