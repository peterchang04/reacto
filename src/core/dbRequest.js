/* Represents a database request to be run */
class Request {
	constructor(text,params,cb){
		// get rid of hidden chars
		text = text.replace(/\t/g," "); 
		text = text.replace(/\n/g," "); 
		// set instance variables
		/* TODO detect injection */
		/* prevent multiple statements */
		this.text = text;
		this.params = params;
		this.cb = cb;
		this.attempts = 0;
	}
}
module.exports = Request;