var saRequest = require('superagent');

class HttpRequest {
	constructor(opts){
		/* mimics jquery ajax arguments */
		var defaultOpts = {
			method:"get",
			path:"/",
			data:{},
			/* just use complete event for now */
			// success:null, // callback
			// error:null,// callback
			complete:null, //callback
			root:"http://localhost:8081/api",
			send:true // whether to immediately send
		}
		/* merge options */
		this.opts = Object.assign({},defaultOpts,opts);

		/* make all args lowercase */
		for(let key in this.opts.data){
			if (this.opts.data.hasOwnProperty(key)) {
				this.opts.data[key.toLowerCase()] = this.opts.data[key];
				if(key.toLowerCase() !== key){
					delete this.opts.data[key];
				}
			}
		}

		/* create superagent url */
		this.url = this.opts.root + this.opts.path;

		if(this.opts.send){
			this.send();
		}
	}
	send(){
		var r = saRequest[this.opts.method](this.url);
		r.set('Content-Type','application/json');
		if(this.opts.data){
			if(this.opts.method === 'get'){
				r.query(this.opts.data);
			} else {
				r.send(this.opts.data);
			}
		}
		r.end((err,res) => {
			if(this.opts.complete){
				// try to json the response
				var resJSON = [];
				try{
					resJSON = JSON.parse(res.text);
				}catch(e){}
				this.opts.complete(resJSON,err,res);
			}
		});
	}
}

module.exports = HttpRequest;