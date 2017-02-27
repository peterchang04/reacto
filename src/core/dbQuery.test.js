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
		expect(e.substring(0,22)).toEqual('Invalid type [invalid]');
		done();
	}
});

it('Catches required keys when defined', (done) => {
	expect.assertions(1);
	try{
		var q = new Query(
			'select top 5 * from person',
			{}, // no personID
			{personID:['invalid',true]}
		);
	}catch(e){
		expect(e).toEqual('personID is required.');
		done();
	}
});