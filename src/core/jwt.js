var jwt = require('jsonwebtoken');
var moment = require("moment");
var secret = require('./conf').jwtSecret;

var JWT = (function(){
	return {
		generate:function(personID,email,first_name,last_name,expiresIn = 60){
			if(!personID) {
				console.log('missing personID');
				return "";
			}
			if(!email){
				console.log('missing email');
				return "";
			}
			var token = jwt.sign({
				sub:personID,
				iss:"https://muz.io",
				email:email,
				first_name:first_name,
				last_name:last_name
			},secret,{
				expiresIn:expiresIn
			});
			return token;
		},
		verify:function(token){
			try{
				var decoded = jwt.verify(token,secret);
				return {
					token:decoded,
					err:null
				}
			}catch(e){
				return {
					token:null,
					err:e
				}
			}
		}
	}
})();

module.exports = JWT;