var Query = require('./dbQuery');

it('Can instantiate Query and run query', (done) => {
	var q = new Query('select top 5 * from person');
	q.run(function(results){
		done();
	});
});

it('Knows when a type is invalid', (done) => {
	expect.assertions(1);
	try{
		var q = new Query(
			'select top 5 * from person',
			{personID:1},
			{personID:['invalid',false]}
		);
	}catch(e){
		console.log('keys and values');
		for(var k in e){
			console.log(k + ' = ' + e[k]);
		}
	}
		
});