var JWT = require("./jwt");

var token = '';
it('should generate token',function(){
	token = JWT.generate(
		123,
		'peter@peter.com',
		'peter',
		'chang'
	);
	expect(token).not.toEqual('');
});

it('should verify token',function(){
	expect.assertions(2);
	var result = JWT.verify(token);
	// remove the timestamps
	delete result.token.iat;
	delete result.token.exp;
	expect(result.err).toEqual(null);
	expect(result.token).toEqual({
		sub:123,
		iss:'https://muz.io',
		email:'peter@peter.com',
		first_name:"peter",
		last_name:"chang"
	});
});

var expiredToken = '';
it('should generate expired token',function(){
	expiredToken = JWT.generate(
		123,
		'peter@peter.com',
		'peter',
		'chang',
		-1
	);
	expect(token).not.toEqual('');
});

it('should see expired token',function(){
	var result = JWT.verify(expiredToken);
	expect(result.err.name).toEqual('TokenExpiredError');
});

it('tries to decode invalid token',function(){
	var result = JWT.verify(token+'!!');
	expect(result.err.name).toEqual('JsonWebTokenError');
});